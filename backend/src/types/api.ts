import { Request } from "express";
import { Iuser } from "../models/userModel";


export interface AuthRequest extends Request{

    user?:Iuser
}