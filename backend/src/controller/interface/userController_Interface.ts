import { Request, Response } from "express";
import { AuthRequest } from "../../types/api";

export interface IuserContrller {
    find_User(req:AuthRequest,res:Response):Promise<void>;
    upload_Profile(req:AuthRequest,res:Response):Promise<void>;
    edit_Profile(req:AuthRequest,res:Response):Promise<void>;
  }