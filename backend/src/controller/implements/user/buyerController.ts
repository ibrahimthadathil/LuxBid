import Container, { Service } from "typedi";
import { buyer_service } from "../../../service/implements/user/buyerService";
import { AuthRequest } from "../../../types/api";
import { Response } from "express";
import { IbuyerContoller } from "../../interface/buyerController";
import { Iuser } from "../../../models/userModel";

@Service()
class BuyerController implements IbuyerContoller{

    constructor(private buyerService : buyer_service){}
    
    async set_Buyer(req:AuthRequest,res:Response){
        try {
            const currentUser = req.user
            if(currentUser){
            const { success , message }=await this.buyerService.set_Buyer(currentUser as string)
            if(success) res.status(200).json({success,message})
             else res.status(401).json({success,message}) 
            }else{
                res.status(401).json({success:false,message:'Invalid Access'})
            }
        } catch (error) {
            console.log(error,'from setBuyer controller');
            res.status(500).json({message:'Internal error, try It Later'})
        }
    }

    async get_Buyer(req:AuthRequest,res:Response){
        try {
            const buyerId = req.user 
            if(buyerId){
               const{success,data,message}= await this.buyerService.get_Buyer(buyerId as string)
                if(success){
                    res.status(200).json({success,data,message:'Approved as a Buyer'})
                }else res.status(403).json({message,success})
            }else{
                res.status(401).json({success:false,message:'Un-Authorized'})
            }
            
        } catch (error) {
            console.log((error as Error).message)
            res.status(500).json({success:false,message:'Internal Error'})
        }
    }

    async committed_Auction(req:AuthRequest, res:Response){
        try {
            const userId = req.user
          const {success,data,message}=  await this.buyerService.allCommited_Auction(userId as string)
          if(success)res.status(200).json({success,data})
          else res.status(404).json({success,message})  
        } catch (error) {
            res.status(500).json({success:false,message:'Internal Error'})
        }
    }
}

export const buyer_controller = Container.get(BuyerController)
