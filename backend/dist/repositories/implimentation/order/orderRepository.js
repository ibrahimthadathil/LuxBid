"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const typedi_1 = require("typedi");
const baseRepository_1 = require("../baseRepository");
const orderModel_1 = require("@/models/orderModel");
const logger_utils_1 = require("@/utils/logger_utils");
const mongoose_1 = __importDefault(require("mongoose"));
let OrderRepository = class OrderRepository extends baseRepository_1.BasRepository {
    constructor() {
        super(orderModel_1.Order);
    }
    findOrdersByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const response = await Order.find({user:userId}).populate('shippingAddress').populate({path:'auction',populate:{path:'post'}})
                return yield orderModel_1.Order.aggregate([
                    {
                        $match: { user: new mongoose_1.default.Types.ObjectId(userId) }
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
                            from: "organizers",
                            let: { orderId: "$_id" },
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
                                                            cond: { $eq: ["$$ratingItem.orderId", "$$orderId"] }
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
                                                cond: { $eq: ["$$ratingItem.orderId", "$$orderId"] }
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
                            rating: { $arrayElemAt: ["$matchedRatings.rating", 0] }
                        }
                    },
                    {
                        $project: { matchedRatings: 0 }
                    }
                ]);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('from order repository');
            }
        });
    }
    getDispatchOrders(sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderModel_1.Order.aggregate([
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
                            "auctionData.seller": new mongoose_1.default.Types.ObjectId(sellerId)
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
                return orders;
            }
            catch (error) {
                console.log('ooo');
                (0, logger_utils_1.logError)(error);
            }
        });
    }
    totalSales() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orderModel_1.Order.aggregate([
                    { $match: { orderStatus: 'Delivered' } },
                    { $group: { _id: null, totalRevenue: { $sum: '$orderAmt' } } },
                    { $project: { _id: 0, totalRevenue: 1 } }
                ]);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('failed to get the orders count');
            }
        });
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], OrderRepository);
