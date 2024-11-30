import {  Response } from "express";
import { AuthRequest } from "../../types/api";

export interface IsellerController{
    set_Organizer(req:AuthRequest,res:Response):Promise<void>
    get_Organizer(req:AuthRequest,res:Response):Promise<void>
  }