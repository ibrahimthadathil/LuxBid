import { Request, Response } from "express";
import { Iuser } from "../../models/userModel";

export interface IAuthController {
  Signup(req: Request, res: Response): Promise<void>;
  verifyOTP(req: Request, res: Response): Promise<void>;
  register(req: Request, res: Response): Promise<void>;
  signIn(req: Request, res: Response): Promise<void>;
  googleAuth(req: Request, res: Response): Promise<void>;
  forgetPassword(req: Request, res: Response): Promise<void>;
  resetOTP(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
}

export interface IadminController {
  adminSignIn(req:Request , res:Response):Promise<void>;
  fetchUsers(req:Request , res:Response):Promise<void>;
  updateUser(req:Request , res:Response):Promise<void>;
}

export interface Iusermangament{
    findAllUsers():Promise<{success:boolean , data:Iuser[]}>
    update_user(email:string):Promise<{ success:boolean , message :string}>
}


export interface IuserContrller {
  findUser():Promise<{success:boolean , data :Iuser}>
}

