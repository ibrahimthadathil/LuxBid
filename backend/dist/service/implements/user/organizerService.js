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
exports.organizerService = void 0;
const typedi_1 = require("typedi");
const organizerRepository_1 = require("../../../repositories/implimentation/organizerRepository");
const userRepository_1 = require("../../../repositories/implimentation/userRepository");
const buyerRepository_1 = require("../../../repositories/implimentation/buyerRepository");
const logger_utils_1 = require("@/utils/logger_utils");
const auctionRepository_1 = require("@/repositories/implimentation/auction/auctionRepository");
const socket_Service_1 = require("../socket/socket_Service");
const tokenService_1 = require("./tokenService");
let organizerService = class organizerService {
    constructor(sellerRepo, userRepo, buyerRepo, auctionRepo, socketService, tokenservice) {
        this.sellerRepo = sellerRepo;
        this.userRepo = userRepo;
        this.buyerRepo = buyerRepo;
        this.auctionRepo = auctionRepo;
        this.socketService = socketService;
        this.tokenservice = tokenservice;
    }
    set_Organizer(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.sellerRepo.findById(userId);
                if (!exist) {
                    const newuser = yield this.sellerRepo.create({ user: userId });
                    yield this.buyerRepo.create({ user: userId });
                    if (newuser) {
                        const response = yield this.userRepo.update(userId, { role: "Seller" });
                        if (response) {
                            const roleAccess = this.tokenservice.generate_AccessToken({ role: response.role, id: response._id });
                            return { success: true, message: "Approved as Buyer", roleAccess };
                        }
                        else
                            throw new Error('Failed to update the user role');
                    }
                    else
                        return { success: true, message: "Failed For The Approval" };
                }
                else
                    return { success: false, message: "Data conflict" };
            }
            catch (error) {
                console.log(error, "from setSeller");
                return { success: false, message: "Internal Error" };
            }
        });
    }
    get_Seller(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Organizer = yield this.sellerRepo.findUserById(userId);
                const Buyer = yield this.buyerRepo.findByUserId(userId);
                if (Organizer && Buyer) {
                    const totalRatings = Organizer.rating.length || 0;
                    const sumRatings = Organizer.rating.reduce((sum, r) => sum + r.rate, 0);
                    const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
                    return { success: true, buyer: Buyer, seller: Organizer, avgRating };
                }
                else {
                    return { success: false, message: 'Approval failed' };
                }
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        });
    }
    finalize_Auction(organizer, auction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.auctionRepo.findById(auction);
                if ((response === null || response === void 0 ? void 0 : response.seller) == organizer) {
                    response.isActive = false;
                    if (response.auctionType == 'Live')
                        response.endTime = new Date();
                    yield response.save();
                    const updated = yield this.buyerRepo.updateAuctionHistory(response); // update the buyer history
                    if (updated) {
                        this.socketService.emitToRoom(auction, 'auctionUpdated', { message: 'Deal finalized' });
                        const losingBidders = response.bidders.filter(bidder => !bidder.isAccept);
                        for (const bidder of losingBidders) {
                            try {
                                // Assuming the bidder object has the paymentIntentId and the amount they paid
                                if (bidder.paymentSessionId) {
                                    // await this.stripeService.refundPayment(bidder.paymentSessionId, bidder.amount);
                                }
                            }
                            catch (error) {
                                (0, logger_utils_1.logError)(error);
                            }
                        }
                        return { success: true };
                    }
                    else
                        return { success: false, message: 'failed to finalise the auction' };
                }
                else
                    throw new Error('un-Authorized');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false };
            }
        });
    }
};
exports.organizerService = organizerService;
exports.organizerService = organizerService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [organizerRepository_1.organizerRepository,
        userRepository_1.userRepository,
        buyerRepository_1.BuyerRepository,
        auctionRepository_1.auctionRepository,
        socket_Service_1.SocketService,
        tokenService_1.tokenService])
], organizerService);
