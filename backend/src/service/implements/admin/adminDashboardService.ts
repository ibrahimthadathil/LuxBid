import { auctionRepository } from "@/repositories/implimentation/auction/auctionRepository";
import { OrderRepository } from "@/repositories/implimentation/order/orderRepository";
import { userRepository } from "@/repositories/implimentation/userRepository";
import { Service } from "typedi";

@Service()
export class adminDashboardService {
  constructor(
    private userRepo: userRepository,
    private auctionRepo: auctionRepository,
    private orderRepo: OrderRepository
  ) {}

  async dashboardDatas() {
    try {
      const users = await this.userRepo.usersByGender();
      const topFiveAuctions = await this.auctionRepo.findTopAuctions();
      const totalOrders = await this.orderRepo.findAll()
      const topSellers = await this.auctionRepo.topAuctionsBuyUser();
      const totalSales = await this.orderRepo.totalSales();
      const groupAuctionsByType = await this.auctionRepo.groupAuctionsByType()
      return {
        success: true,
        users: users[0].genderStatus,
        totalUsers: users[0].totalUsers,
        topFiveAuctions,
        totalOrders:totalOrders.length,
        topSellers,
        totalSales,
        groupAuctionsByType
      };
    } catch (error) {
        return {success:false , message:(error as Error).message}
    }
  }
}
