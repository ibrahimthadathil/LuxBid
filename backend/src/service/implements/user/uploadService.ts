import { Service } from "typedi";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Service()
export class s3Service {
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

  async upload_File(file: Express.Multer.File, folder: string) {
    try {
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

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${folder}/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
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
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
