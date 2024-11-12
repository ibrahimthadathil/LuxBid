import { Service } from "typedi";
import { BuyerRepository } from "../../../repositories/implimentation/buyerRepository";
import { userRepository } from "../../../repositories/implimentation/userRepository";

@Service()
export class buyer_service {
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
          await this.userRepo.update(userId,{role:'Buyer'})  
          return { success: true, message: "Approved as Buyer" };
        }else return {success:false ,message:'Faild for the approval'}
      } else {
        return { success: false , message :'Data conflict'};
      }
    } catch (error) {
        console.log(error,'from setBuyer');
        return {success:false , message:'Internal Error'}

    }
  }
}
