import { Service } from "typedi";
import { organizerRepository } from "../../../repositories/implimentation/organizerRepository";
import { userRepository } from "../../../repositories/implimentation/userRepository";
import { BuyerRepository } from "../../../repositories/implimentation/buyerRepository";

@Service()
export class organizerService {
  constructor(
    private sellerRepo: organizerRepository,
    private userRepo: userRepository,
    private buyerRepo : BuyerRepository
  ) {}

  async set_organizer(userId: string) {
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
    try {
     const Organizer = await this.sellerRepo.findUserById(userId) 
     const Buyer = await this.buyerRepo.findByUserId(userId)
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
}
