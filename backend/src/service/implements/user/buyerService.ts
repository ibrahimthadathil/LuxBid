import { Service } from "typedi";
import { BuyerRepository } from "../../../repositories/implimentation/buyerRepository";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { IBuyerService } from "../../interface/buyerService_Interface";
import { Iuser } from "../../../models/userModel";

@Service()
export class buyer_service implements IBuyerService {
  constructor(
    private buyerRepo: BuyerRepository,
    private userRepo: userRepository
  ) {}

  async set_Buyer(userId: string) {
    try {
      const exist = await this.buyerRepo.findByUserId(userId);
      if (!exist) {
        const setUp = await this.buyerRepo.create({ user: userId });
        if (setUp) {
          await this.userRepo.update(userId, { role: "Buyer" });
          return { success: true, message: "Approved as Buyer" };
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
      await this.buyerRepo.create_BidHistory(auctionId,userId,amt)
    } catch (error) {
      
    }
  }
}
