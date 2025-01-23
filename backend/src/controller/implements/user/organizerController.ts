import Container, { Service } from "typedi";
import { organizerService } from "../../../service/implements/user/organizerService";
import { Response } from "express";
import { AuthRequest } from "../../../types/api";
import { IsellerController } from "../../interface/sellerController";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { json } from "stream/consumers";
import { logError } from "@/utils/logger_utils";

    @Service()
 class organizerController implements IsellerController{

    constructor(private orgService : organizerService){}

    async set_Organizer(req:AuthRequest,res:Response ){
        try {
            const sellerId = req.user 
           const {success , message} = await this.orgService.set_Organizer(sellerId as string)
            if(success){
                res.status(HttpStatus.OK).json({success,message})
            }else res.status(HttpStatus.UNAUTHORIZED).json({success,message})
            
        } catch (error) {
            logError(error)
            console.log((error as Error).message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false ,message:responseMessage.ERROR_MESSAGE})
            
        }
    }
    async get_Organizer(req:AuthRequest,res:Response){
        try {
            const userId = req.user
            
           if(userId){
            const {success,message,buyer,seller}= await this.orgService.get_Seller(userId as string)            
           if(success){
            res.status(HttpStatus.OK).json({data:[seller,buyer]})
           }else res.status(HttpStatus.BAD_REQUEST).json({ message })
           }else {
            console.log('kkk');
            res.status(HttpStatus.FORBIDDEN).json({message:responseMessage.ACCESS_DENIED})}
        } catch (error) {
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
        }
    }
    async finalize_Deal(req:AuthRequest,res:Response){
        try {
          const organizer = req?.user
          const auctionId = req.params.id
          const {success,message}=  await this.orgService.finalize_Auction(organizer as string,auctionId)
          if(success)res.status(HttpStatus.OK).json({success})
            else res.status(HttpStatus.SERVICE_UNAVAILABLE).json({success})
          
        } catch (error) {
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
        }
      }
}

export const Organizer_Controller = Container.get(organizerController)