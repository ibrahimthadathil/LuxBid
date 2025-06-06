import { Service } from "typedi";
import { BuyerRepository } from "../../../repositories/implimentation/buyerRepository";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { IBuyerService } from "../../interface/buyerService_Interface";
import { tokenService } from "./tokenService";
import {logError } from "@/utils/logger_utils";
import { responseMessage } from "@/enums/http_StatusCode";

@Service()
export class buyer_service implements IBuyerService {
  constructor(
    private buyerRepo: BuyerRepository,
    private userRepo: userRepository,
    private tokenService : tokenService
  ) {}

  async set_Buyer(userId: string) {
    try {
      const exist = await this.buyerRepo.findByUserId(userId);
      if (!exist) {
        const setUp = await this.buyerRepo.create({ user: userId });
        if (setUp) { 
          const response = await this.userRepo.update(userId, { role: "Buyer" });
          if (response) {
          const roleAccess = this.tokenService.generate_AccessToken({id:response._id ,role:response.role}) 
          return { success: true, message: "Approved as Buyer" ,roleAccess};
        }else throw new Error('Failed to update the role')
        } else return { success: false, message: "Faild for the approval" };
      } else {
        return { success: false, message: "Data conflict" };
      }
    } catch (error) {
      console.log(error, "from setBuyer");
      return { success: false, message: "Internal Error" };
    }
  }
  async get_Buyer(buyerID: string) {
    try {
      const buyer = await this.buyerRepo.findByUserId(buyerID);
      if (buyer) return { success: true, data: buyer };
      else return { success: false, message: "failed for approval" };
    } catch (error) {
      throw new Error((error as Error).message);
      
    }
  }

  async set_MYBids(auctionId:string,userId:string,amt:number){
    try {

     const response = await this.buyerRepo.create_BidHistory(auctionId,userId,amt)
     if(response)return{success:true}
     else throw new Error('Failed to set the history')
    } catch (error) {
      console.log((error as Error).message);
      
      console.log('error from create buyer history');
      return {success:false , message:(error as Error).message}
    }
  }

  async allCommited_Auction(user:string){
    try {
       const response = await this.buyerRepo.findCommitedBids(user)
       if(response)return {success:true , data:response}
       else return {success:false , message :'failed to load the bids, Try later'}
    } catch (error) {
      return {success:false , message :(error as Error).message}
    }
  }

  async findWonAuctions(userId:string){
    try {
      const response = await this.buyerRepo.findWonAuction(userId)      
      if(response)return { success:true , data : response[0]?.committedBids }
      else return { success:false , message : responseMessage.NOT_FOUND }
    } catch (error) {
      console.log(error)
      logError(error)
      return { success: false , message : responseMessage.ERROR_MESSAGE}
    }
  }
  
}
