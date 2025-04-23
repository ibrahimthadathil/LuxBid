import { auctionRepository } from "@/repositories/implimentation/auction/auctionRepository";
import { OrderRepository } from "@/repositories/implimentation/order/orderRepository";
import { userRepository } from "@/repositories/implimentation/userRepository";
import { Service } from "typedi";

@Service()
export class adminDashboardService{
   constructor(
    private userRepo : userRepository,
    private auctionRepo : auctionRepository,
    private orderRepo :OrderRepository
   ){} 

   async dashboardDatas(){
    try {
        
        const users =  await this.userRepo.usersByGender()
        const topFiveAuctions = await this.auctionRepo.findTopAuctions()
        const totalOrders = await this.orderRepo.findAll()
        // const topSellers = await  

    } catch (error) {
        
    }
   
   }
}