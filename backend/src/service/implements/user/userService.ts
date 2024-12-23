import { Service } from "typedi";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { s3Service } from "./uploadService";
import { Iuser } from "../../../models/userModel";
import { IuserService } from "../../interface/userService_Interface";
import { stripeService } from "../stripe/stripeService";
import { auctionRepository } from "../../../repositories/implimentation/auction/auctionRepository";
import { buyer_service } from "./buyerService";

@Service()
export class userService implements IuserService {
  constructor(
    private userRepo: userRepository,
    private s3Services: s3Service,
    private stripeService: stripeService,
    private auctionRepo : auctionRepository,
    private buyerService : buyer_service
  ) {}

  async upload_Profile(userId: string, file: Express.Multer.File) {
    try {
      const currentUser = await this.userRepo.findById(userId);
      if (currentUser) {
        const response = await this.s3Services.upload_File(file, "Profile");
        if (!Array.isArray(response)) {
          if (response.success) {
            this.userRepo.update(currentUser._id as string, {
              profile: response.Location,
            });
            return { success: true, message: "Profile updated" };
          } else throw new Error("error occured in file upload");
        } else return { success: false, message: "updation failed" };
      } else throw new Error("User not found");
    } catch (error) {
      console.log(error);
      return { success: false, message: (error as Error).message };
    }
  }

  async edit_Profile(data: Iuser, userId: string) {
    try {
      const response = await this.userRepo.update(userId, data);
      if (response) {
        return { success: true, message: "Details updated" };
      } else throw new Error("Failed to update");
    } catch (error) {
      console.log("from update details");
      throw new Error((error as Error).message);
    }
  }

  async auction_JoinPayment(data: any) {
    try {
      const session = await this.stripeService.makePaymentSession(data);
      if (session) return { success: true, session };
      else return { success: false, message: "Failed to make payment" };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async auction_Join(query: any, userId: string) {
    try {
      const response = await this.stripeService.payment_Status(query, userId);      
      const data = {
        status: response.status,
        customer_email: response.customer_details.email,
      };
      if(response.status=='complete'){
      const currentAuction = await this.auctionRepo.findById(query.aid)
      const response = await this.auctionRepo.join_Auction(query.aid,userId,currentAuction?.entryAmt as number)
      if(response){
       const {success,message} = await this.buyerService.set_MYBids(query.aid,userId,currentAuction?.entryAmt as number)
      return {success,message,data} 
      }else throw new Error('failed to make payment')
    }
      else throw new Error("Failed to complete The Payment");
    } catch (error) {
      console.log((error as Error).message);
      return {success:false , message:(error as Error).message }
    }
  }
}
