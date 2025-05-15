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
exports.auctionService = void 0;
const typedi_1 = require("typedi");
const auctionRepository_1 = require("../../../repositories/implimentation/auction/auctionRepository");
const category_Repository_1 = require("../../../repositories/implimentation/admin/category_Repository");
const auctionScheduledService_1 = require("./auctionScheduledService");
const logger_utils_1 = require("@/utils/logger_utils");
let auctionService = class auctionService {
    constructor(auctionRepo, categoryRepo, scheduledAuctionService) {
        this.auctionRepo = auctionRepo;
        this.categoryRepo = categoryRepo;
        this.scheduledAuctionService = scheduledAuctionService;
    }
    create_Auction(auction, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entryAmt = (auction.baseAmount * 10) / 100 <= 1
                    ? 1
                    : Math.ceil((auction.baseAmount * 10) / 100);
                auction.seller = userId;
                auction.entryAmt = entryAmt;
                const existPost = yield this.auctionRepo.findByPost(auction.post);
                if (existPost)
                    return { success: false, message: "Already made With this post" };
                const response = yield this.auctionRepo.create(auction);
                if (response) {
                    if (response.auctionType == 'Scheduled')
                        yield this.scheduledAuctionService.scheduleAuctionClosure(response._id, response.endTime);
                    return { success: true, message: "Auction Hosted" };
                }
                else
                    return { success: false, message: "Failed to Host, Try later" };
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    getUserAll_Auction(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.auctionRepo.findByUser(userId);
                if (response)
                    return { success: true, data: response };
                else
                    throw new Error("Failed to fetch");
            }
            catch (error) {
                return {
                    success: false,
                    message: "Internal Error, Try Later " + error.message,
                };
            }
        });
    }
    close_Auction(auctionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.auctionRepo.update(auctionId, {
                    isActive: false,
                });
                if (response) {
                    return { success: true, message: "Deal is closed" };
                }
                else
                    throw new Error("failed to update");
            }
            catch (error) {
                return {
                    success: false,
                    message: "Internal error " + error.message,
                };
            }
        });
    }
    delete_Auction(auctionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectedAuction = yield this.auctionRepo.findById(auctionId);
                if (selectedAuction === null || selectedAuction === void 0 ? void 0 : selectedAuction.isActive)
                    return { success: false, message: "Close the auction to delete..!" };
                const response = yield this.auctionRepo.delete(auctionId);
                if (response)
                    return { success: true, message: "Deleted Successfully" };
                else
                    throw new Error("failed to delete");
            }
            catch (error) {
                return {
                    success: false,
                    message: "INtern error " + error.message,
                };
            }
        });
    }
    getDisplay_Auctions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.auctionRepo.findAuctionByLimit();
                if (res)
                    return { success: true, data: res[0] };
                else
                    return { success: false, message: "failed to load" };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: "Internal server error , try later" };
            }
        });
    }
    view_Auction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.auctionRepo.viewAuction(id);
                if (response)
                    return { data: response, success: true };
                else
                    throw new Error('Failed to fetch');
                // if (response) {
                //   if (Response) {
                //     return { data: { data: response, organizer: true }, success: true };
                //   } else if (userId) {
                //     const isExistInAuction = response.bidders.find(
                //       (user) => user.user == userId
                //     );
                //     if (isExistInAuction)
                //       return {
                //         data: { data: response, organizer: false },
                //         success: true,
                //       };
                //     else
                //       return { data: { data: response, isLoggout: true }, success: true };
                //   } else {
                //     return { data: { data: response, isLoggout: true }, success: true };
                //   }
                // } else throw new Error("failed to Fetch");
            }
            catch (error) {
                return {
                    success: false,
                    message: "Internal server error , try later" + error.message,
                };
            }
        });
    }
    auction_Interface(auctionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.auctionRepo.auction_Participants(auctionId);
                response === null || response === void 0 ? void 0 : response.bidders.sort((a, b) => b.amount - a.amount);
                if (response) {
                    const organizer = yield this.auctionRepo.findById(auctionId);
                    if ((organizer === null || organizer === void 0 ? void 0 : organizer.seller.toString()) == userId.toString())
                        return { success: true, organizer: true, auction: response };
                    else
                        return { success: true, organizer: false, auction: response };
                }
                else
                    throw new Error("failed to fetch Auction");
            }
            catch (error) {
                console.log("error frm service");
                return { success: false, message: error.message };
            }
        });
    }
    raiseBidAMT(amt, auctionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.auctionRepo.updateBidAMT(auctionId, userId, amt);
                if (response)
                    return { success: true, message: 'raised ' }; // add name later
                else
                    return { success: false, message: 'failed to raise' };
            }
            catch (error) {
                console.log('error from bid rise');
                return { success: false, message: error.message };
            }
        });
    }
    acceptBidAmt(user, bidamt, auction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.auctionRepo.accept_currentBid(user, bidamt, auction);
                if (response)
                    return { success: true, message: 'Deal granted' };
                else
                    throw new Error('failed to Accept the deal');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    filterd_Auctions(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = 5, skip = 0, page = 0, search = '', category = 'All', types = 'All' } = queries;
                const allCategory = yield this.categoryRepo.findAllCategoryByField().then(data => data.map(cate => cate.name));
                const finalCategory = category === 'All' ? [...allCategory] : [category];
                const allType = types == 'All' ? ['Live', 'Scheduled'] : [types];
                const result = yield this.auctionRepo.filterd_Auctions(limit, skip, page, search, finalCategory, allType);
                if (result) {
                    return { success: true, data: result, category: allCategory };
                }
                else
                    throw new Error('Failed to load the Deals');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    listBy_Type(auctionType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.auctionRepo.findAllByType(auctionType);
                if (response)
                    return { success: true, data: response };
                else
                    throw new Error('Failed to fetch');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
};
exports.auctionService = auctionService;
exports.auctionService = auctionService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auctionRepository_1.auctionRepository, category_Repository_1.categoryRepository,
        auctionScheduledService_1.scheduledAuctionService])
], auctionService);
