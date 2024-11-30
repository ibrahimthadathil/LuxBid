import { Request, Response } from "express";


export interface IadminController {
    adminSignIn(req:Request , res:Response):Promise<void>;
    fetchUsers(req:Request , res:Response):Promise<void>;
    updateUser(req:Request , res:Response):Promise<void>;
  }
  