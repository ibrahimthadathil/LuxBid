import { Service } from "typedi";
import { organizerRepository } from "../../../repositories/implimentation/organizerRepository";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { BuyerRepository } from "../../../repositories/implimentation/buyerRepository";
import { IorgaizerService } from "../../interface/organizerService_Interface";
import { logError } from "@/utils/logger_utils";
import { auctionRepository } from "@/repositories/implimentation/auction/auctionRepository";
import { SocketService } from "../socket/socket_Service";
import { stripeService } from "../stripe/stripeService";

@Service()
export class organizerService implements IorgaizerService{
  constructor(
    private sellerRepo: organizerRepository,
    private userRepo: userRepository,
    private buyerRepo : BuyerRepository,
    private auctionRepo :auctionRepository,
    private socketService : SocketService,
    private stripeService : stripeService
  ) {}

  async set_Organizer(userId: string) {
    try {
      const exist = await this.sellerRepo.findById(userId);
      if (!exist) {
        const res = await this.sellerRepo.create({ user: userId });
          await this.buyerRepo.create({user:userId})
        if (res) {
          await this.userRepo.update(userId, { role: "Seller" });
          return { success: true, message: "Approved as Buyer" };
        } else return { success: true, message: "Failed For The Approval" };
      } else return { success: false, message: "Data conflict" };
    } catch (error) {
      console.log(error, "from setSeller");
      return { success: false, message: "Internal Error" };
    }
  }

  async get_Seller(userId:string){
    console.log('7777777',userId);
    
    try {
     const Organizer = await this.sellerRepo.findUserById(userId) 
     const Buyer = await this.buyerRepo.findByUserId(userId)
     console.log('888888',Organizer,'00000',Buyer);
     
     if(Organizer&&Buyer){
        return {success:true , buyer:Buyer , seller:Organizer}
     }else{
      return {success:false , message:'Approval failed'}
     }
    } catch (error) {
      console.log((error as Error).message);
      throw new Error((error as Error).message)
    }
  }

   async finalize_Auction(organizer:string,auction:string){
      try {
         const response =  await this.auctionRepo.findById(auction)
         if(response?.seller==organizer){
          response.isActive = false;
          if(response.auctionType=='Live')response.endTime = new Date()
          await response.save() 
         const updated =  await this.buyerRepo.updateAuctionHistory(response)// update the buyer history
          if(updated){
            this.socketService.emitToRoom(auction, 'auctionUpdated', { message: 'Deal finalized'});

            const losingBidders = response.bidders.filter(bidder => !bidder.isAccept);
            for (const bidder of losingBidders) {
              try {
                // Assuming the bidder object has the paymentIntentId and the amount they paid
                if (bidder.paymentSessionId) {
                  // await this.stripeService.refundPayment(bidder.paymentSessionId, bidder.amount);
                }
              } catch (error) {
                logError(error);
              }
            }
    



            return{success:true}
           } else return {success:false ,message:'failed to finalise the auction'}
         }
         else throw new Error('un-Authorized')
         
      } catch (error) {
        logError(error)
        return {success:false}
      }
    }

}
