import { Service } from "typedi";
import { organizerRepository } from "../../../repositories/implimentation/organizerRepository";
import { userRepository } from "../../../repositories/implimentation/userRepository";

@Service()
export class organizerService {
  constructor(
    private sellerRepo: organizerRepository,
    private userRepo: userRepository
  ) {}

  async set_organizer(userId: string) {
    try {
      const exist = await this.sellerRepo.findById(userId);
      if (!exist) {
        const res = await this.sellerRepo.create({ user: userId });
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
}
