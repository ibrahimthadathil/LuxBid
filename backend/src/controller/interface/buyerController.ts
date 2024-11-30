
import { Response } from "express";
import { AuthRequest } from "../../types/api";

export interface IbuyerContoller {
    set_Buyer(req:AuthRequest,res:Response):Promise<void>
    get_Buyer(req:AuthRequest,res:Response):Promise<void>
  }
