import Container, { Service } from "typedi";
import { auctionService } from "../../../service/implements/auction/auctionService";
import { AuthRequest } from "../../../types/api";
import { Response } from "express";

@Service()
export class auctionController {
  constructor(private auctionService: auctionService) {}
  async create_Auction(req:AuthRequest,res:Response){
    console.log('from controller');
    await this.auctionService.create_Auction()
    res.send({})
  }
}

export const auction_Controller = Container.get(auctionController);
