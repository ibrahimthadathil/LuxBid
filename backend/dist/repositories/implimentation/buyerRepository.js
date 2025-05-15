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
exports.BuyerRepository = void 0;
const typedi_1 = require("typedi");
const buyerModel_1 = require("../../models/buyerModel");
const baseRepository_1 = require("./baseRepository");
const logger_utils_1 = require("@/utils/logger_utils");
const mongoose_1 = __importDefault(require("mongoose"));
let BuyerRepository = class BuyerRepository extends baseRepository_1.BasRepository {
    constructor() {
        super(buyerModel_1.Buyer);
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield buyerModel_1.Buyer.findOne({ user: id }).populate({
                    path: "user",
                    select: "-password",
                });
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Error from finding buyer");
            }
        });
    }
    create_BidHistory(auctionId, userId, amt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield buyerModel_1.Buyer.findOneAndUpdate({ user: userId, "committedBids.auction": { $ne: auctionId } }, { $addToSet: { committedBids: { auction: auctionId, bidAmt: amt } } }, { upsert: true });
            }
            catch (error) {
                console.log("repo error frm history");
                console.log(error.message);
            }
        });
    }
    findCommitedBids(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield buyerModel_1.Buyer.findOne({ user: id }).populate({ path: 'committedBids.auction', populate: [
                        { path: 'post' }, { path: 'bidders.user', select: 'email profile firstName ' }
                    ] });
                console.log(data);
                return data;
            }
            catch (error) {
                console.log('error from finding buyer', error.message);
                throw new Error('failed to load the bids');
            }
        });
    }
    updateAuctionHistory(auction) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield buyerModel_1.Buyer.bulkWrite(bulkOps);
                return true;
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.error('Error updating auction history:', error);
            }
        });
    }
    findWonAuction(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield buyerModel_1.Buyer.aggregate([
                    {
                        $match: { user: new mongoose_1.default.Types.ObjectId(userId) }
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
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
};
exports.BuyerRepository = BuyerRepository;
exports.BuyerRepository = BuyerRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], BuyerRepository);
