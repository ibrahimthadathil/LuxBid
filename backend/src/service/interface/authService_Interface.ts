import { Iuser } from "../../models/userModel";

export interface IauthService {
    create_User(email:string):Promise<{ message : string , token ?: string , success ? : boolean}>;
    verify_otp(otp:string,token:string):Promise<{success:boolean, message:string , token ?:string , refresh ?: string , name ?:string , email ?:string}>;
    register_User(userDetails:Iuser , token :string):Promise<{success : boolean , token ?:string , message : string}> ;
    verify_SignIn(email:string , password :string ):Promise<{ success : boolean , refresh ?: string , message :string , token ?:string , name ?: string , email?:string }>;
    verify_Google(userDetails : Iuser):Promise<{ success:boolean , token? :string , message : string }>;
    forget_Password( email : string ):Promise<{ success : boolean , token? : string , message: string}>;
    reset_otp( token : string , otp :string):Promise<{success : boolean , token? : string , message: string}>
    reset_Password (password : string ,confirmPassword:string ,Token : string ):Promise<{success : boolean , token? : string , message: string}>
    
} 