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
  async getUserAll_Auction(userId:string){
    try {
     const response= await this.auctionRepo.findByUser(userId)
     if(response)return {success:true , data :response}
     else throw new Error('Failed to fetch')
    } catch (error) {
      return {success:false , message:'Internal Error, Try Later '+(error as Error).message}
    }
  }
  async close_Auction(auctionId:string){
    try {
     const response= await this.auctionRepo.update(auctionId,{isActive:false})
     if(response)return {success:true , message :'Deal closed'}
     else throw new Error('failed to update')
    } catch (error) {
      return {success:false , message :'Internal error '+(error as Error).message}
    }
  }
  async delete_Auction(auctionId:string){
    try {
      const selectedAuction = await this.auctionRepo.findById(auctionId)
      if(selectedAuction?.isActive)return {success:false , message:'Close the auction to delete..!'}
      const response = await this.auctionRepo.delete(auctionId)
      if(response)return{success:true,message:'Deleted Successfully'}
      else throw new Error('failed to delete')
    } catch (error) {
      return {success:false , message :'INtern error '+(error as Error).message}
    }
  }
  async getDisplay_Auctions(){
      try {
       const res= await this.auctionRepo.findAuctionByLimit() 
       if(res)return {success:true ,data:res[0]}
       else return {success:false,message:'failed to load'}
      } catch (error) {
        return {success:false , message :'Internal server error , try later'}
      }
  }
  async findByLimit(){
    try {
      const response = await this.auctionRepo.findAuctionByLimit()
      if(response)return {data:response,success:true}
      else return {success:false , message:'Failed to retrive'}
    } catch (error) {
      return {success:false , message :'Internal server error , try later'}
    }
  }
}
