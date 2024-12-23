import { Service } from "typedi";
import { Buyer, IBuyer } from "../../models/buyerModel";
import { BasRepository } from "./baseRepository";

@Service()
export class BuyerRepository extends BasRepository<IBuyer> {
  constructor() {
    super(Buyer);
  }
  async findByUserId(id: string) {
    try {
      return await Buyer.findOne({ user: id }).populate({
        path: "user",
        select: "-password",
      });
    } catch (error) {
      console.log((error as Error).message);
      throw new Error("Error from finding buyer");
    }
  }
  async create_BidHistory(auctionId: string, userId: string, amt: number) {
    try {
      
      return await Buyer.findOneAndUpdate(
        { user: userId, "committedBids.auction": { $ne: auctionId } },
        { $addToSet: { committedBids: { auction: auctionId, bidAmt: amt } } },
        { upsert: true }
      );
      
    } catch (error) {
      console.log("repo error frm history");
      console.log((error as Error).message);
    }
  }
  async findCommitedBids(id:string,){
    try {
      return await Buyer.findOne({user:id}).populate({path:'committedBids.auction',populate:{
        path:'post'
      }})
    } catch (error) {
      console.log('error from finding buyer',(error as Error).message);
      throw new Error('failed to load the bids')
    }
  }
}
