import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { Iuser, User } from "@/models/userModel";
import { AuthRequest } from "@/types/api";
import { setCookie } from "@/utils/cookie_utils";
import { generateAccessToken, verifyToken } from "@/utils/jwt_util";
import { logDebug, logError } from "@/utils/logger_utils";
import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";


export const buyerAuthMiddleware =async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const buyerId = req.user 
               const token = req.cookies.authtkn 
               console.log(token,'from the buyer');
               
               if(!token)res.status(HttpStatus.UNAUTHORIZED).json({message:responseMessage.TOKEN_ACCESS})
                 const {role,id}= verifyToken(token) as JwtPayload
                 if(!role){
                   console.log('#####');                  
                   const currentuser =await User.findById(buyerId)
                   console.log(currentuser, ':- from buyerAuth');
                   const authToken = generateAccessToken({id:currentuser?._id,role:currentuser?.role})
                   console.log(authToken,':- token created');
                   setCookie(res,'authtkn',authToken)
                 }  
                 console.log(role,'now');
                 
                 if((role === "Seller" || role === "Buyer")&&buyerId==id){
                  console.log('tttt');
                  next()}
                 else {
                console.log('reaaa');
                res.status(HttpStatus.FORBIDDEN).json({message:responseMessage.ACCESS_DENIED})}
                
        
    } catch (error) { 
        logError(error)
    }
}