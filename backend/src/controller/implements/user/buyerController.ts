import Container, { Service } from "typedi";
import { buyer_service } from "../../../service/implements/user/buyerService";
import { AuthRequest } from "../../../types/api";
import { Response } from "express";

@Service()
class BuyerController{

    constructor(private buyerService : buyer_service){}
    
    async setBuyer(req:AuthRequest,res:Response){
        try {
            const currentUser = req.user
            if(currentUser){
            const { success , message }=await this.buyerService.set_Buyer(currentUser._id as string)
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

}

export const buyer_controller = Container.get(BuyerController)
