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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionRepository = void 0;
const typedi_1 = require("typedi");
const auctionModel_1 = require("../../../models/auctionModel");
const baseRepository_1 = require("../baseRepository");
const logger_utils_1 = require("@/utils/logger_utils");
let auctionRepository = class auctionRepository extends baseRepository_1.BasRepository {
    constructor() {
        super(auctionModel_1.Auction);
    }
    findByPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.findOne({ post: id });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error("Failed to find auction");
            }
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return auctionModel_1.Auction.find({ seller: userId }).populate("post");
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error("Failed to Fetch auction");
            }
        });
    }
    findTopAuctions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.aggregate([
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
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error("Error from finding Top 5");
            }
        });
    }
    findAuctionByLimit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.aggregate([
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
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error("Failed to retrive the data");
            }
        });
    }
    viewAuction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.findOne({ _id: id })
                    .populate("post")
                    .populate("seller", "-password")
                    .populate({
                    path: "bidders.user",
                    select: "email",
                });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
            }
        });
    }
    join_Auction(auctionId, userId, bidAmt, paymentSessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.findOneAndUpdate({ _id: auctionId, "bidders.user": { $ne: userId } }, {
                    $addToSet: {
                        bidders: {
                            user: userId,
                            bidTime: Date.now(),
                            amount: bidAmt,
                            paymentSessionId,
                            paymentStatus: "pending",
                        },
                    },
                }, { new: true });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log("from bidcreatye");
                console.log(error.message);
            }
        });
    }
    auction_Participants(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.findById(id).populate({
                    path: "bidders.user",
                    select: "firstName profile",
                });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log("error from participents");
                console.log(error.message);
            }
        });
    }
    updateBidAMT(id, userId, amt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.findOneAndUpdate({ _id: id, "bidders.user": userId }, { $set: { "bidders.$.amount": amt, "bidders.$.bidTime": Date.now() } }, { new: true });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log("error from updateAmt");
                throw new Error("failed to raise the bid");
            }
        });
    }
    accept_currentBid(user, amt, auction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.bulkWrite([
                    {
                        updateOne: {
                            filter: { _id: auction },
                            update: { $set: { "bidders.$[].isAccept": false } },
                        },
                    },
                    {
                        updateOne: {
                            filter: { _id: auction, "bidders.user": user },
                            update: { $set: { "bidders.$.isAccept": true }, baseAmount: amt },
                        },
                    },
                ]);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log("error fom bulkwrite");
            }
        });
    }
    filterd_Auctions(limit, skip, page, search, category, auctionType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterdData = yield auctionModel_1.Auction.find({
                    title: { $regex: search, $options: "i" },
                    auctionType: { $in: auctionType },
                })
                    .populate({
                    path: "post",
                    populate: {
                        path: "category",
                        select: "name",
                        match: { name: { $in: category } },
                    },
                })
                    .skip(page * limit)
                    .limit(limit);
                return filterdData.filter((item) => {
                    const postWithCategory = item.post;
                    return postWithCategory.category !== null;
                });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log("err f  query");
                console.log(error.message);
            }
        });
    }
    findAllByType(auctionType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.find({ auctionType: auctionType })
                    .populate("seller", "-password")
                    .populate("post");
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log("error from find by type :-" + error.message);
            }
        });
    }
    updatePaymentStatus(auctionId, userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.updateOne({ _id: auctionId, "bidders.user": userId }, { $set: { "bidders.$.paymentStatus": status } });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
            }
        });
    }
    topAuctionsBuyUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield auctionModel_1.Auction.aggregate([
                    { $group: { _id: "$seller", auctionCount: { $sum: 1 } } },
                    { $sort: { auctionCount: -1 } },
                    { $limit: 5 },
                    {
                        $lookup: {
                            from: "users",
                            localField: "_id",
                            foreignField: "_id",
                            as: "seller",
                        },
                    },
                    { $unwind: "$seller" },
                    {
                        $project: {
                            _id: 0,
                            sellerId: "$seller._id",
                            name: "$seller.firstName",
                            profile: "$seller.profile",
                            auctionCount: 1,
                        },
                    },
                ]);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error("Failed to fetch the top sellers");
            }
        });
    }
    groupAuctionsByType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return auctionModel_1.Auction.aggregate([
                    { $group: { _id: "$auctionType", count: { $sum: 1 } } },
                ]);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
            }
        });
    }
};
exports.auctionRepository = auctionRepository;
exports.auctionRepository = auctionRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], auctionRepository);
