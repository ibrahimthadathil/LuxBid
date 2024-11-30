

export interface IuploadServise{
    validate_Files(file:Express.Multer.File):Promise<void>,
    upload_File(file: Express.Multer.File |Express.Multer.File[], folder: string):Promise<{success?:boolean,Location?:string}>
}