import Container, { Service } from "typedi";
import { auctionService } from "../../../service/implements/auction/auctionService";
import { AuthRequest } from "../../../types/api";
import { Response } from "express";
import { IAuction } from "../../../models/auctionModel";

@Service()
export class auctionController {
  constructor(private auctionService: auctionService) {}
  
  async create_Auction(req:AuthRequest,res:Response){
    const organizer = req.user 
    const auction = req.body as IAuction
    try {
    if(organizer){      
     const {message,success} = await this.auctionService.create_Auction(auction,organizer._id as string)
     if(success)res.status(200).json({message,success})
      else res.status(401).json({message,success})
    }else throw new Error('Invalid access,')  
    } catch (error) {
      res.status(500).json({message:'Internal error, Try Later'})
    }  
  }
}
export const auction_Controller = Container.get(auctionController);
