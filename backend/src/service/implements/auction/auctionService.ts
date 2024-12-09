import { Service } from "typedi";
import { auctionRepository } from "../../../repositories/implimentation/auction/auctionRepository";
import { IAuction } from "../../../models/auctionModel";

@Service()
export class auctionService {
  constructor(private auctionRepo: auctionRepository) {}
  async create_Auction(auction:IAuction,userId:string){
    try {
      console.log('111',auction);
      
      const entryAmt = auction.baseAmount*10/100 <= 1 ? 1 : Math.ceil(auction.baseAmount*10/100)
      auction.seller = userId
      auction.entryAmt = entryAmt
    const existPost = await this.auctionRepo.findByPost(auction.post)    
    if(existPost)return {success:false , message:'Already made With this post'}
    const response = await this.auctionRepo.create(auction)
    if(response) return {success:true , message:'Auction Hosted'}
    else return {success:false , message :'Failed to Host, Try later'}
    } catch (error) {
      return {success:false , message :(error as Error).message}      
    }
    
  }
}
