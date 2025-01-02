import { Service } from "typedi";
import { auctionRepository } from "../../../repositories/implimentation/auction/auctionRepository";
import { IAuction } from "../../../models/auctionModel";
import { categoryRepository } from "../../../repositories/implimentation/admin/category_Repository";
import { scheduledAuctionService } from "./auctionScheduledService";
import { save } from "agenda/dist/job/save";
import { logError } from "@/utils/logger_utils";

@Service()
export class auctionService {
  constructor(
    private auctionRepo: auctionRepository,private categoryRepo :categoryRepository ,
    private scheduledAuctionService :scheduledAuctionService, ) {}

  async create_Auction(auction: IAuction, userId: string) {
    try {
      console.log("111", auction);

      const entryAmt =
        (auction.baseAmount * 10) / 100 <= 1
          ? 1
          : Math.ceil((auction.baseAmount * 10) / 100);
      auction.seller = userId;
      auction.entryAmt = entryAmt;
      const existPost = await this.auctionRepo.findByPost(auction.post);
      if (existPost)
        return { success: false, message: "Already made With this post" };
      const response = await this.auctionRepo.create(auction);
      if (response){
        if(response.auctionType=='Scheduled')await this.scheduledAuctionService.scheduleAuctionClosure(response._id ,response.endTime)
        return { success: true, message: "Auction Hosted" };
      } 
      else return { success: false, message: "Failed to Host, Try later" };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
  async getUserAll_Auction(userId: string) {
    try {
      const response = await this.auctionRepo.findByUser(userId);
      if (response) return { success: true, data: response };
      else throw new Error("Failed to fetch");
    } catch (error) {
      return {
        success: false,
        message: "Internal Error, Try Later " + (error as Error).message,
      };
    }
  }
  async close_Auction(auctionId: string) {
    try {
      const response = await this.auctionRepo.update(auctionId, {
        isActive: false,
      });
      if (response) return { success: true, message: "Deal closed" };
      else throw new Error("failed to update");
    } catch (error) {
      return {
        success: false,
        message: "Internal error " + (error as Error).message,
      };
    }
  }
  async delete_Auction(auctionId: string) {
    try {
      const selectedAuction = await this.auctionRepo.findById(auctionId);
      if (selectedAuction?.isActive)
        return { success: false, message: "Close the auction to delete..!" };
      const response = await this.auctionRepo.delete(auctionId);
      if (response) return { success: true, message: "Deleted Successfully" };
      else throw new Error("failed to delete");
    } catch (error) {
      return {
        success: false,
        message: "INtern error " + (error as Error).message,
      };
    }
  }
  async getDisplay_Auctions() {
    try {
      const res = await this.auctionRepo.findAuctionByLimit();
      if (res) return { success: true, data: res[0] };
      else return { success: false, message: "failed to load" };
    } catch (error) {
      return { success: false, message: "Internal server error , try later" };
    }
  }
  async view_Auction(id: string) {
    try {
      const response = await this.auctionRepo.viewAuction(id);
      if(response)return {data:response,success:true}
      else throw new Error('Failed to fetch');
      // if (response) {
      //   if (Response) {
      //     return { data: { data: response, organizer: true }, success: true };
      //   } else if (userId) {
      //     const isExistInAuction = response.bidders.find(
      //       (user) => user.user == userId
      //     );
      //     if (isExistInAuction)
      //       return {
      //         data: { data: response, organizer: false },
      //         success: true,
      //       };
      //     else
      //       return { data: { data: response, isLoggout: true }, success: true };
      //   } else {
      //     return { data: { data: response, isLoggout: true }, success: true };
      //   }
      // } else throw new Error("failed to Fetch");
    } catch (error) {
      return {
        success: false,
        message: "Internal server error , try later" + (error as Error).message,
      };
    }
  }
  async auction_Interface(auctionId: string, userId: string) {
    try {
      const response = await this.auctionRepo.auction_Participants(auctionId);
      response?.bidders.sort((a, b) => b.amount - a.amount);
      console.log(response);
      if (response) {
        const organizer = await this.auctionRepo.findById(auctionId);
        console.log(
          "&*&*&*",
          organizer?.seller.toString() == userId.toString()
        );
        if (organizer?.seller.toString() == userId.toString())
          return { success: true, organizer: true, auction: response };
        else return { success: true, organizer: false, auction: response };
      } else throw new Error("failed to fetch Auction");
    } catch (error) {
      console.log("error frm service");
      return { success: false, message: (error as Error).message };
    }
  }
  async raiseBidAMT(amt: number,auctionId:string ,userId: string) {
    try {      
       const response = await this.auctionRepo.updateBidAMT(auctionId,userId,amt)
       if(response)return{success:true , message:'raised '} // add name later
        else return {success:false , message:'failed to raise'}
    } catch (error) {
      console.log('error from bid rise');
      return {success:false , message:(error as Error).message}
    }
  }
  async acceptBidAmt(user:string,bidamt:number,auction:string){
    try {
      const response = await this.auctionRepo.accept_currentBid(user,bidamt,auction)
      console.log(response,'@@@');
      
      if(response)return {success:true,message:'Deal granted'}
      else throw new Error('failed to Accept the deal')
    } catch (error) {
      return {success:false , message:(error as Error).message}
    }
  }
  async filterd_Auctions(queries:any){
    try {
      const {
        limit = 5,
        skip = 0,
        page = 0,
        search = '',
        category = 'All',
        types ='All'
      } = queries;
      const allCategory = await this.categoryRepo.findAllCategoryByField().then(data=>data.map(cate=>cate.name))
      const finalCategory = category ==='All'?[...allCategory]:[category]
      const allType = types=='All'?['Live','Scheduled']:[types]
      const result =await this.auctionRepo.filterd_Auctions(limit,skip,page,search,finalCategory,allType) 
      if(result){
        return { success:true , data: result ,category :allCategory}
      } else throw new Error('Failed to load the Deals') 
    } catch (error) {
      return {success:false , message:(error as Error).message}
    }
  }
  async listBy_Type(auctionType:string){
    try {
     const response = await this.auctionRepo.findAllByType(auctionType)
     if(response)return {success:true , data:response}
     else throw new Error('Failed to fetch')
    } catch (error) {
      return {success:false , message :(error as Error).message}
    }
  }

}
