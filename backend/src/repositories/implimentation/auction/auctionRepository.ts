import { Service } from "typedi";
import { Auction, IAuction } from "../../../models/auctionModel";
import { BasRepository } from "../baseRepository";

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
            TopAuction:[
              {$lookup:{ from:'products',localField:'post',foreignField:'_id',as :'posts'}},
              {$addFields:{biddersCount:{$size:'$bidders'}}},
              {$sort:{biddersCount:-1}}
            ],
            Live: [
              {$lookup:{ from:'products',localField:'post',foreignField:'_id',as :'posts'}},
              { $match: { auctionType: "Live", isActive: true } },
              { $limit: 3 },
            ],
            Scheduled: [
              {$lookup:{ from:'products',localField:'post',foreignField:'_id',as :'posts'}},
              { $match: { auctionType: "Scheduled", isActive: true } },
              { $limit: 3 },
            ],
          },
        },
      ]);
    } catch (error) {
      throw new Error('Failed to retrive the data')
    }
  }

  async viewAuction(id:string){
    try {
      return await Auction.findOne({_id:id}).populate('post').populate('seller','-password')
    } catch (error) {
      
    }
  }

  async join_Auction(auctionId:string,userId:string,bidAmt:number){
    try {
      await Auction.findOneAndUpdate({_id:auctionId,"bidders.user": { $ne: userId }},{$addToSet:{bidders:{user:userId,bidTime:Date.now(),amount:bidAmt}}},{new:true})
      return
    } catch (error) {
      console.log('from bidcreatye');
      console.log((error as Error).message );
      
    }
  }

  async auction_Participants(id:string){
    try {
      return await Auction.findById(id).populate({path: 'bidders.user',select:'firstName profile'})
         
    } catch (error) {
      console.log('error from participents');
      console.log((error as Error).message );

    }
  } 
}
