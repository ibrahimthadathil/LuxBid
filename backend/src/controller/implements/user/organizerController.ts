import Container, { Service } from "typedi";
import { organizerService } from "../../../service/implements/user/organizerService";
import { Response } from "express";
import { AuthRequest } from "../../../types/api";
import { IsellerController } from "../../interface/sellerController";
import { HttpStatus } from "@/enums/http_StatusCode";
import { json } from "stream/consumers";

    @Service()
 class organizerController implements IsellerController{

    constructor(private orgService : organizerService){}

    async set_Organizer(req:AuthRequest,res:Response ){
        try {
            const sellerId = req.user 
           const {success , message} = await this.orgService.set_Organizer(sellerId as string)
            if(success){
                res.status(200).json({success,message})
            }else res.status(401).json({success,message})
            
        } catch (error) {
            console.log((error as Error).message);
            res.status(500).json({success:false ,message:'Internal errot,Try It Later'})
            
        }
    }
    async get_Organizer(req:AuthRequest,res:Response){
        try {
                console.log('123455');
                
            const userId = req.user
            console.log('@@@',userId);
            
           if(userId){
            const {success,message,buyer,seller}= await this.orgService.get_Seller(userId as string)
            console.log('999999',success,message,buyer,seller);
            
           if(success){
            res.status(200).json({data:[seller,buyer]})
           }else res.status(400).json({ message })
           }else res.status(403).json({message:'Access Denied'})
        } catch (error) {
            console.log((error as Error).message);
            res.status(500).json({message:'Internal error ,Try after'})
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
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Internal error ,Try after'})
        }
      }
}

export const Organizer_Controller = Container.get(organizerController)