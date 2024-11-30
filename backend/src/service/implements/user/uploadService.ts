import { Service } from "typedi";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { log } from "console";

@Service()
export class s3Service implements s3Service{
  private s3Service: S3Client;
  constructor() {
    this.s3Service = new S3Client({
      credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY || "",
        secretAccessKey: process.env.BUCKET_SECRET_KEY || "",
      },
      region: process.env.BUCKET_REGION || "",
    });
  }
  private validate_Files(file:Express.Multer.File){
    if (file.size > 2 * 1024 * 1024)
      throw new Error("File size too large. Maximum size is 2MB");
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.mimetype))
      throw new Error("Only image files are allowed");
  }
  async upload_File(file: Express.Multer.File |Express.Multer.File[], folder: string) {
    try {

      const images = Array.isArray(file) ?file : [file]
      images.forEach(img => this.validate_Files(img));
      const results = await Promise.all(
        images.map(async (img) => {
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${folder}/${Date.now()}-${img.originalname}`,
            Body: img.buffer,
            ContentType: img.mimetype,
          };

          const command = new PutObjectCommand(params);
          await this.s3Service.send(command);

          const getObjectCommand = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: params.Key,
          });

          const presignedUrl = await getSignedUrl(
            this.s3Service,
            getObjectCommand,
            { expiresIn: 604800 }
          );

          return {
            success: true,
            Location: presignedUrl,
          }
        })
      )
        return Array.isArray(file) ? results : results[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
