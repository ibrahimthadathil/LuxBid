import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/api";
import { verifyToken } from "../utils/jwt_util";
import { JwtPayload } from "jsonwebtoken";
import { Iuser, User } from "../models/userModel";


export const AuthMiddleWare =async(req:AuthRequest,res:Response,next:NextFunction)=>{

    try {

        let refreshToken = req.cookies.rftn
        // console.log(refreshToken);
        
        // console.log(refreshToken);
        if(!refreshToken){
            throw new Error("UnAuthorized user..., User don't have token")
        }else{
            const {email} = verifyToken(refreshToken) as JwtPayload
            const currentUser = await User.findOne({email},'-password')
            console.log(currentUser);            
            if(!currentUser?.isActive){
                res.clearCookie('rftn')
                throw new Error('User Access denied By the Authority')
            }
            req.user = currentUser as Iuser            
            next()

        }

    } catch (error) {
        console.log('error from middleware');
        res.status(400).json({message:(error as Error).message})
    }

}