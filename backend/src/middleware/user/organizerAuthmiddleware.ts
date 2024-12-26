import { HttpStatus } from "@/enums/http_StatusCode";
import { Iuser, User } from "@/models/userModel";
import { AuthRequest } from "@/types/api";
import { logDebug, logError } from "@/utils/logger_utils";
import { NextFunction, Response } from "express";


export const OrganizerAuthMiddleware =async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const userId = req.user 
        const buyer = await User.findById(userId,'-password') as Iuser
        if(buyer.role=='Seller'){
        logDebug('from seller middleware')
        next()
        }else res.status(HttpStatus.UNAUTHORIZED).json({message:" you don't have access to"})        
        
    } catch (error) {
        logError(error)
    }
}