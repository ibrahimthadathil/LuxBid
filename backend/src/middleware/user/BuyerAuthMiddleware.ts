import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import {  User } from "@/models/userModel";
import { AuthRequest } from "@/types/api";
import { setCookie } from "@/utils/cookie_utils";
import { generateAccessToken, verifyToken } from "@/utils/jwt_util";
import { logError } from "@/utils/logger_utils";
import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";


export const buyerAuthMiddleware =async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const buyerId = req.user 
               const token = req.cookies.authtkn 
               
               if(!token)res.status(HttpStatus.UNAUTHORIZED).json({message:responseMessage.TOKEN_ACCESS})
                 const {role,id}= verifyToken(token) as JwtPayload
                 if(!role){
                   const currentuser =await User.findById(buyerId)
                   const authToken = generateAccessToken({id:currentuser?._id,role:currentuser?.role})
                   setCookie(res,'authtkn',authToken)
                 }  
                 
                 if((role === "Seller" || role === "Buyer")&&buyerId==id){
                  next()}
                 else {
                res.status(HttpStatus.FORBIDDEN).json({message:responseMessage.ACCESS_DENIED})}
                
        
    } catch (error) { 
        logError(error)
    }
}