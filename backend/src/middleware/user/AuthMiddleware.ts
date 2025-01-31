import { NextFunction, Response } from "express";
import { AuthRequest } from "@/types/api";
import { verifyToken } from "@/utils/jwt_util";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";


export const AuthMiddleWare =async(req:AuthRequest,res:Response,next:NextFunction)=>{

    try {
        
        const token = req.headers['authorization']
        console.log(token,'1111');
        
        if(!token)res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access denied . No token provided" })
         else{
            const {id} = verifyToken(token) as JwtPayload
            const userId = id
            if(userId){
                req.user = userId
                next()
            }else res.status(HttpStatus.UNAUTHORIZED).json({message:responseMessage.ACCESS_DENIED})
        }

    } catch (error) {
        console.log((error as Error).message);
        console.log('error from middleware');
        res.status(400).json({message:(error as Error).message})
    }

}