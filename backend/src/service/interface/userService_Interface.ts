import { Iuser } from "../../models/userModel";

export interface IuserService{
    upload_Profile(userId:string,file:Express.Multer.File):Promise<{success:boolean,message:string}>,
    edit_Profile(data:Iuser,userId:string):Promise<{success:boolean,message:string}>
}