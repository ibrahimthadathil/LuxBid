import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/api";
import { verifyToken } from "../utils/jwt_util";
import { JwtPayload } from "jsonwebtoken";
import { Iuser, User } from "../models/userModel";


export const AuthMiddleWare =async(req:AuthRequest,res:Response,next:NextFunction)=>{

    try {

        let Accesstoken = req.headers.authorization
        // let refreshToken
        if(!Accesstoken){
            throw new Error("UnAuthorized user...user don't have token")
        }else{
            const {email} = verifyToken(Accesstoken) as JwtPayload
            const currentUser = await User.findOne(email)
            // if(!currentUser?.isActive){
            //     throw new Error('User Access denied By the Authority')
            // }
            // req.user = currentUser as Iuser
            // next()

        }

        
    } catch (error) {
        res.status(400).json({message:(error as Error).message})
    }

}