import { Request, Response } from "express";


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
  