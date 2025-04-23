import { Service } from "typedi";
import { Auction, IAuction } from "../../../models/auctionModel";
import { BasRepository } from "../baseRepository";
import { logError } from "@/utils/logger_utils";

@Service()
export class auctionRepository extends BasRepository<IAuction> {
  constructor() {
    super(Auction);
  }

  async findByPost(id: string) {
    try {
      return await Auction.findOne({ post: id });
    } catch (error) {
      throw new Error("Failed to find auction");
    }
  }

  async findByUser(userId: string) {
    try {
      return Auction.find({ seller: userId }).populate("post");
    } catch (error) {
      throw new Error("Failed to Fetch auction");
    }
  }

  async findTopAuctions() {
    try {
      return await Auction.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "post",
            foreignField: "_id",
            as: "posts",
          },
        },
        {
          $addFields: {
            biddersCount: { $size: "$bidders" },
          },
        },
        {
          $sort: { biddersCount: -1 },
        },
      ]);
    } catch (error) {
      throw new Error("Error from finding Top 5");
    }
  }

  async findAuctionByLimit() {
    try {
      return await Auction.aggregate([
        {
          $facet: {
            TopAuction: [
              {
                $lookup: {
                  from: "products",
                  localField: "post",
                  foreignField: "_id",
                  as: "posts",
                },
              },
              { $addFields: { biddersCount: { $size: "$bidders" } } },
              { $sort: { biddersCount: -1 } },
            ],
            Live: [
              {
                $lookup: {
                  from: "products",
                  localField: "post",
                  foreignField: "_id",
                  as: "posts",
                },
              },
              { $match: { auctionType: "Live", isActive: true } },
              { $limit: 3 },
            ],
            Scheduled: [
              {
                $lookup: {
                  from: "products",
                  localField: "post",
                  foreignField: "_id",
                  as: "posts",
                },
              },
              { $match: { auctionType: "Scheduled", isActive: true } },
              { $limit: 3 },
            ],
          },
        },
      ]);
    } catch (error) {
      throw new Error("Failed to retrive the data");
    }
  }

  async viewAuction(id: string) {
    try {
      return await Auction.findOne({ _id: id })
        .populate("post")
        .populate("seller", "-password")
        .populate({
          path: "bidders.user",
          select: "email",
        });
    } catch (error) {}
  }

  async join_Auction(auctionId: string, userId: string, bidAmt: number,paymentSessionId: string) {
    try {
    return  await Auction.findOneAndUpdate(
        { _id: auctionId, "bidders.user": { $ne: userId } },
        {
          $addToSet: {
            bidders: { user: userId, bidTime: Date.now(), amount: bidAmt , paymentSessionId ,paymentStatus: "pending"},
        }},
        { new: true }
      );
      
    } catch (error) {
      console.log("from bidcreatye");
      console.log((error as Error).message);
    }
  }

  async auction_Participants(id: string) {
    try {
      return await Auction.findById(id).populate({
        path: "bidders.user",
        select: "firstName profile",
      });
    } catch (error) {
      console.log("error from participents");
      console.log((error as Error).message);
    }
  }

  async updateBidAMT(id: string, userId: string, amt: number) {
    try {
      return await Auction.findOneAndUpdate(
        { _id: id, "bidders.user": userId },
        { $set: { "bidders.$.amount": amt, "bidders.$.bidTime": Date.now() } },
        { new: true }
      );
    } catch (error) {
      console.log("error from updateAmt");
      throw new Error("failed to raise the bid");
    }
  }

  async accept_currentBid(user: string, amt: number, auction: string) {
    try {
      
      
    return await Auction.bulkWrite([
      {
        
        updateOne: {
          filter: { _id: auction },
          update: { $set: { "bidders.$[].isAccept": false } }, 
        },
      },
      {
        updateOne: {
          filter: { _id: auction, "bidders.user": user },
          update: { $set: { "bidders.$.isAccept": true } , baseAmount:amt }, 
        },
      },
      ]);
           
    } catch (error) {
      console.log('error fom bulkwrite');
      
    }
  }

  async filterd_Auctions(limit:number,skip:number,page:number,search:string,category:string[],auctionType:string[]){
    try {
      
      const filterdData = await Auction.find({
        title: { $regex: search, $options: 'i' },
        auctionType: { $in: auctionType },
      })
        .populate({
          path: 'post',populate:{
            path:'category',
            select:'name',
            match: { name: { $in: category } },
          } 
        })
        .skip(page * limit) 
        .limit(limit)        
        return filterdData.filter(item => {
          const postWithCategory = item.post as { category?: string | null };
          return postWithCategory.category !== null;
      });
      
    } catch (error) {
      console.log('err f  query');
      console.log((error as Error).message);
      
    }
  }

  async findAllByType(auctionType: string){
    try {
      return await Auction.find({auctionType:auctionType}).populate('seller','-password').populate('post')
    } catch (error) {
      console.log('error from find by type :-'+ (error as Error).message);
    }
  }

  async updatePaymentStatus(auctionId: string, userId: string, status: string){
    try {
     return await Auction.updateOne( { _id: auctionId, "bidders.user": userId },
        { $set: { "bidders.$.paymentStatus": status } })
    } catch (error) {
      logError(error)
    }
  }

  

}
