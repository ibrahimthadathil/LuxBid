import { NextFunction, Response } from "express";
import { AuthRequest } from "@/types/api";
import { verifyToken } from "@/utils/jwt_util";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "@/enums/http_StatusCode";


export const AuthMiddleWare =async(req:AuthRequest,res:Response,next:NextFunction)=>{

    try {
        
        const token = req.headers['authorization']
        if(!token)res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access denied . No token provided" })
         else{
            const {id} = verifyToken(token) as JwtPayload
            const _id = id
            if(_id){
                req.user = _id
                next()
            }else res.status(HttpStatus.UNAUTHORIZED)
        }

    } catch (error) {
        console.log('error from middleware');
        res.status(400).json({message:(error as Error).message})
    }

}