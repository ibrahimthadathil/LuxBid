import { JwtPayload } from "jsonwebtoken";
import { Iuser } from "../../models/userModel";

export interface IauthService {
    createUser(email:string):Promise<{ message : string , token ?: string , success ? : boolean}>;
    verifyotp(otp:string,token:string):Promise<{success:boolean, message:string , token ?:string , refresh ?: string , name ?:string , email ?:string}>;
    registerUser(userDetails:Iuser , token :string):Promise<{success : boolean , token ?:string , message : string}> ;
    verifySignIn(email:string , password :string ):Promise<{ success : boolean , refresh ?: string , message :string , token ?:string , name ?: string , email?:string }>;
    verifyGoogle(userDetails : Iuser):Promise<{ success:boolean , token? :string , message : string }>;
    forget_Password( email : string ):Promise<{ success : boolean , token? : string , message: string}>;
    reset_otp( token : string , otp :string):Promise<{success : boolean , token? : string , message: string}>
    reset_Password (password : string ,confirmPassword:string ,Token : string ):Promise<{success : boolean , token? : string , message: string}>
    
} 

export interface IOtpService {
    createOTP(email: string): Promise<string>;
    verifyOTP(email: string, otp: string): Promise<boolean>;
}

export interface IEmailService {
    sendOtpEmail(email: string, OTP: string, subject: string): Promise<void>;
}

export interface ITokenService {
    generate_AccessToken(payload: JwtPayload): string;
    generate_RefreshToken(payload: JwtPayload): string;
    verify_Token(token: string): JwtPayload;
}
