import { Service } from "typedi";
import { BasRepository } from "../baseRepository";
import { IOrder, Order } from "@/models/orderModel";
import { logError } from "@/utils/logger_utils";
import mongoose from "mongoose";

@Service()
export class OrderRepository extends BasRepository<IOrder>{

    constructor(){
        super(Order)
    }

    async findOrdersByUser (userId:string){
        try {            
            // const response = await Order.find({user:userId}).populate('shippingAddress').populate({path:'auction',populate:{path:'post'}})
            return await Order.aggregate([
                {
                  $match: { user: new mongoose.Types.ObjectId(userId) }
                },
                {
                  $lookup: {
                    from: "addresses",
                    localField: "shippingAddress",
                    foreignField: "_id",
                    as: "shippingAddress"
                  }
                },
                {
                  $unwind: { path: "$shippingAddress", preserveNullAndEmptyArrays: true }
                },
                {
                  $lookup: {
                    from: "auctions",
                    localField: "auction",
                    foreignField: "_id",
                    as: "auction"
                  }
                },
                {
                  $unwind: { path: "$auction", preserveNullAndEmptyArrays: true }
                },
                {
                  $lookup: {
                    from: "products",
                    localField: "auction.post",
                    foreignField: "_id",
                    as: "auction.post"
                  }
                },
                {
                  $unwind: { path: "$auction.post", preserveNullAndEmptyArrays: true }
                },
                {
                  $lookup: {
                    from: "organizers", // Lookup Organizer collection
                    let: { orderId: "$_id" }, // Define orderId as the current Order's _id
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $gt: [
                              {
                                $size: {
                                  $filter: {
                                    input: "$rating",
                                    as: "ratingItem",
                                    cond: { $eq: ["$$ratingItem.orderId", "$$orderId"] } // Match orderId
                                  }
                                }
                              },
                              0
                            ]
                          }
                        }
                      },
                      {
                        $project: {
                          rating: {
                            $filter: {
                              input: "$rating",
                              as: "ratingItem",
                              cond: { $eq: ["$$ratingItem.orderId", "$$orderId"] } // Extract matching rating
                            }
                          }
                        }
                      }
                    ],
                    as: "matchedRatings"
                  }
                },
                {
                  $addFields: {
                    rating: { $arrayElemAt: ["$matchedRatings.rating", 0] } // Extract rating if exists
                  }
                },
                {
                  $project: { matchedRatings: 0 } // Remove unnecessary field
                }
              ]);
              
        } catch (error) {
            logError(error)
            throw new Error('from order repository');
            
        }
    }

    async getDispatchOrders(sellerId:string){
        try {            
            const orders = await Order.aggregate([
                {
                    $lookup: {
                        from: "auctions", 
                        localField: "auction",
                        foreignField: "_id",
                        as: "auctionData"
                    }
                },
                {
                    $unwind: "$auctionData" 
                },
                {
                    $match: {
                        "auctionData.seller": new mongoose.Types.ObjectId(sellerId) 
                    }
                },
                {
                    $lookup: {
                        from: "products", 
                        localField: "auctionData.post", 
                        foreignField: "_id",
                        as: "auctionData.post"
                    }
                },
                {
                    $unwind: { path: "$auctionData.post", preserveNullAndEmptyArrays: true } 
                },
                {
                    $lookup: {
                        from: "addresses", 
                        localField: "shippingAddress",
                        foreignField: "_id",
                        as: "shippingAddress"
                    }
                },
                {
                    $unwind: "$shippingAddress"
                }
            ]);
            return orders
            
        } catch (error) {
            console.log('ooo');
            logError(error)
            
        }
    }
    
}