export interface IuploadServise {
  upload_File(
    file: Express.Multer.File | Express.Multer.File[],
    folder: string
  ): Promise<| { success: boolean; Location: string }
  | { success: boolean; Location: string }[]>;
}
