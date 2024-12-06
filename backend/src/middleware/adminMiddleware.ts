import { NextFunction, Response } from "express";
import { AdminRequest } from "../types/api";
import { Admin, Iadmin } from "../models/admin/adminModal";
import { verifyToken } from "../utils/jwt_util";
import { JwtPayload } from "jsonwebtoken";



export const AdminMiddleware =async(req:AdminRequest,res:Response,next:NextFunction)=>{
    try {
        const refreshToken = req.cookies.admtkn
        if(refreshToken){
            const {email} = verifyToken(refreshToken) as JwtPayload
            if(email){
                const admin =await Admin.findOne({email:email})
                req.admin = admin as Iadmin
                next()
            }else throw new Error('Authenticate failed')
        }else  throw new Error("UnAuthorized Admin..., Admin don't have token")
    } catch (error) {
        console.log('from admin middle ware',error);
        res.status(400).json({message:(error as Error).message})
    }
}