import { Iproduct } from "../../models/productModel";


export interface IproductService{
    create_Post(user:string,datas:Partial<Iproduct>,files:Express.Multer.File[]):Promise<{success:boolean,message:string}>
    findUser_Post(userId:string):Promise<{success:boolean,message?:string,data?:Iproduct[]}>,
    findAll_Products(status:boolean):Promise<{success:boolean,message?:string,data?:Iproduct[]}>
    // remove_Post(id:string):Promise<{success:boolean,message:string}>,
    update_PostStatus(id:string):Promise<{success:boolean,message:string}>,
    reject_Post(id:string):Promise<{success:boolean,message:string}>
}