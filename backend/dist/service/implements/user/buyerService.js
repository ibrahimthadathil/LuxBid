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
exports.buyer_service = void 0;
const typedi_1 = require("typedi");
const buyerRepository_1 = require("../../../repositories/implimentation/buyerRepository");
const userRepository_1 = require("../../../repositories/implimentation/userRepository");
const tokenService_1 = require("./tokenService");
const logger_utils_1 = require("@/utils/logger_utils");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
let buyer_service = class buyer_service {
    constructor(buyerRepo, userRepo, tokenService) {
        this.buyerRepo = buyerRepo;
        this.userRepo = userRepo;
        this.tokenService = tokenService;
    }
    set_Buyer(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.buyerRepo.findByUserId(userId);
                if (!exist) {
                    const setUp = yield this.buyerRepo.create({ user: userId });
                    if (setUp) {
                        const response = yield this.userRepo.update(userId, { role: "Buyer" });
                        if (response) {
                            const roleAccess = this.tokenService.generate_AccessToken({ id: response._id, role: response.role });
                            return { success: true, message: "Approved as Buyer", roleAccess };
                        }
                        else
                            throw new Error('Failed to update the role');
                    }
                    else
                        return { success: false, message: "Faild for the approval" };
                }
                else {
                    return { success: false, message: "Data conflict" };
                }
            }
            catch (error) {
                console.log(error, "from setBuyer");
                return { success: false, message: "Internal Error" };
            }
        });
    }
    get_Buyer(buyerID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buyer = yield this.buyerRepo.findByUserId(buyerID);
                if (buyer)
                    return { success: true, data: buyer };
                else
                    return { success: false, message: "failed for approval" };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    set_MYBids(auctionId, userId, amt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.buyerRepo.create_BidHistory(auctionId, userId, amt);
                if (response)
                    return { success: true };
                else
                    throw new Error('Failed to set the history');
            }
            catch (error) {
                console.log(error.message);
                console.log('error from create buyer history');
                return { success: false, message: error.message };
            }
        });
    }
    allCommited_Auction(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.buyerRepo.findCommitedBids(user);
                if (response)
                    return { success: true, data: response };
                else
                    return { success: false, message: 'failed to load the bids, Try later' };
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    findWonAuctions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.buyerRepo.findWonAuction(userId);
                console.log('$$$$', response);
                if (response)
                    return { success: true, data: (_a = response[0]) === null || _a === void 0 ? void 0 : _a.committedBids };
                else
                    return { success: false, message: http_StatusCode_1.responseMessage.NOT_FOUND };
            }
            catch (error) {
                console.log(error);
                (0, logger_utils_1.logError)(error);
                return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
};
exports.buyer_service = buyer_service;
exports.buyer_service = buyer_service = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [buyerRepository_1.BuyerRepository,
        userRepository_1.userRepository,
        tokenService_1.tokenService])
], buyer_service);
