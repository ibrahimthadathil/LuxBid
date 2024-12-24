import { Request } from "express";
import { Iuser } from "../models/userModel";
import { Iadmin } from "../models/admin/adminModal";


export interface AuthRequest extends Request{

    user?:string
}

export interface AdminRequest extends Request{
    admin?:Iadmin
}