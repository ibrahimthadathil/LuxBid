import { Request } from "express";
import { Iuser } from "../models/userModel";
import { Iadmin } from "../models/admin/adminModal";


export interface AuthRequest extends Request{

    user?:Iuser
}

export interface AdminRequest extends Request{
    admin?:Iadmin
}