import { Service } from "typedi";
import { auctionRepository } from "../../../repositories/implimentation/auction/auctionRepository";

@Service()
export class auctionService {
  constructor(private auctionRepo: auctionRepository) {}
  async create_Auction(){
    console.log('from service');
    
  }
}
