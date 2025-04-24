import { NextFunction, Response } from "express";
import { AdminRequest } from "../types/api";
import { Admin, Iadmin } from "../models/admin/adminModal";
import { verifyToken } from "../utils/jwt_util";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";



export const AdminMiddleware =async(req:AdminRequest,res:Response,next:NextFunction)=>{
    try {
        const refreshToken = req.cookies.admtkn
        if(refreshToken){
            const {email} = verifyToken(refreshToken) as JwtPayload
            if(email){
                const admin =await Admin.findOne({email:email})
                req.admin = admin as Iadmin
                next()
            }else throw new Error(responseMessage.ACCESS_DENIED)
        }else  throw new Error(responseMessage.TOKEN_ACCESS)
    } catch (error) {
        console.log('from admin middle ware',error);
        res.status(HttpStatus.UNAUTHORIZED).json({message:(error as Error).message})
    }
}