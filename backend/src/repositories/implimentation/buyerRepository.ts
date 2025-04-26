import { Service } from "typedi";
import { Buyer, IBuyer } from "../../models/buyerModel";
import { BasRepository } from "./baseRepository";
import { logError } from "@/utils/logger_utils";
import { IAuction } from "@/models/auctionModel";
import mongoose from "mongoose";

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
     const data=  await Buyer.findOne({user:id}).populate({path:'committedBids.auction',populate:[
        { path : 'post' } , { path : 'bidders.user', select:'email profile firstName ' }
      ]})
      console.log(data);
      
      return data
    } catch (error) {
      console.log('error from finding buyer',(error as Error).message);
      throw new Error('failed to load the bids')
    }
  }
  async updateAuctionHistory(auction:IAuction) {
    try {
      const bulkOps = auction.bidders.map(bidder => ({
        updateOne: {
          filter: { 
            user: bidder.user,
            'committedBids.auction': auction._id 
          },
          update: {
            $set: {
              'committedBids.$.bidStatus': bidder.isAccept ? 'WIN' : 'LOST',
              'committedBids.$.bidAmt': bidder.amount,
              'committedBids.$.bidDate': bidder.bidTime
            }
          }
        }
      }));
  
       await Buyer.bulkWrite(bulkOps);
      
        return true
      
  
    } catch (error) {
      logError(error)
      console.error('Error updating auction history:', error);
    }
  
  
  }
  async findWonAuction(userId:string){
    try {
      return await Buyer.aggregate([
      { 
          $match: { user: new mongoose.Types.ObjectId(userId) } 
      },
      { 
          $unwind: "$committedBids"
      },
      { 
          $match: { "committedBids.bidStatus": "WIN" } 
      },
      {
        $lookup: {
          from: "auctions", 
          localField: "committedBids.auction",
          foreignField: "_id",
          as: "committedBids.auction"
        }
      },
      {
        $unwind: "$committedBids.auction"
      },
      { 
        $match: { "committedBids.auction.isSold": false } 
      },
      {
        $lookup: {
          from: "products", 
          localField: "committedBids.auction.post",
          foreignField: "_id",
          as: "committedBids.auction.post"
        }
      },
      {
        $group: {
          _id: null, 
          committedBids: { $push: "$committedBids" } 
        }
      },
      {
        $project: {
          _id: 0
        }
      }  
    ]);
    } catch (error) {
      console.log((error as Error).message)
    }
  }
}
