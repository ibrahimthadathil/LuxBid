import { Iuser } from "../../models/userModel"


export interface IadminAuth{
    admin_Signin(email:string,password:string):Promise<{success:boolean,refresh?:string,access?:string,message:string,name?:string,adminEmail?:string}>
}

export interface IadminUser{
    findAll_Users(role:string):Promise<{success:boolean,data:Iuser[],}>;
    update_User(email:string):Promise<{success:boolean,message:string}>
}
