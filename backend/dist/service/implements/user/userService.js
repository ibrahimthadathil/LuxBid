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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const typedi_1 = require("typedi");
const userRepository_1 = require("../../../repositories/implimentation/userRepository");
const uploadService_1 = require("./uploadService");
const stripeService_1 = require("../stripe/stripeService");
const auctionRepository_1 = require("../../../repositories/implimentation/auction/auctionRepository");
const buyerService_1 = require("./buyerService");
const paymentRepository_1 = require("@/repositories/implimentation/user/paymentRepository");
const paymentModel_1 = require("@/models/paymentModel");
let userService = class userService {
    constructor(userRepo, s3Services, stripeService, auctionRepo, buyerService, paymentRepo) {
        this.userRepo = userRepo;
        this.s3Services = s3Services;
        this.stripeService = stripeService;
        this.auctionRepo = auctionRepo;
        this.buyerService = buyerService;
        this.paymentRepo = paymentRepo;
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = yield this.userRepo.findById(userId);
                if (currentUser) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const _a = currentUser.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
                    return { success: true, data: rest };
                }
                else
                    throw new Error('failed to fetch');
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
    upload_Profile(userId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = yield this.userRepo.findById(userId);
                if (currentUser) {
                    const response = yield this.s3Services.upload_File(file, "Profile");
                    if (!Array.isArray(response)) {
                        if (response.success) {
                            this.userRepo.update(currentUser._id, {
                                profile: response.Location,
                            });
                            return { success: true, message: "Profile updated" };
                        }
                        else
                            throw new Error("error occured in file upload");
                    }
                    else
                        return { success: false, message: "updation failed" };
                }
                else
                    throw new Error("User not found");
            }
            catch (error) {
                console.log(error);
                return { success: false, message: error.message };
            }
        });
    }
    edit_Profile(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepo.update(userId, data);
                if (response) {
                    return { success: true, message: "Details updated" };
                }
                else
                    throw new Error("Failed to update");
            }
            catch (error) {
                console.log("from update details");
                throw new Error(error.message);
            }
        });
    }
    auction_JoinPayment(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield this.stripeService.makePaymentSession(data, userId);
                if (session) {
                    yield this.auctionRepo.join_Auction(data.id, userId, data.price, session.id);
                    yield this.paymentRepo.create({ transactionId: session.id, amount: data.price, paymentType: paymentModel_1.paymentType.ENTRY_FEE, status: paymentModel_1.paymentStatus.PENDING, userId, auctionId: data.id });
                    return { success: true, session };
                }
                else
                    return { success: false, message: "Failed to make payment" };
            }
            catch (error) {
                console.log('here');
                console.log("11111", error.message);
                return { success: false, message: error.message };
            }
        });
    }
    auction_Join(query, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.stripeService.payment_Status(query);
                const data = {
                    status: response.status,
                    customer_email: (_a = response.customer_details) === null || _a === void 0 ? void 0 : _a.email,
                };
                if (response.status == 'complete') {
                    const currentAuction = yield this.auctionRepo.findById(query.aid);
                    const response = yield this.auctionRepo.updatePaymentStatus(query.aid, userId, "completed");
                    if (response) {
                        const { success, message } = yield this.buyerService.set_MYBids(query.aid, userId, currentAuction === null || currentAuction === void 0 ? void 0 : currentAuction.entryAmt);
                        return { success, message, data };
                    }
                    else
                        throw new Error('failed to make payment');
                }
                else
                    throw new Error("Failed to complete The Payment");
            }
            catch (error) {
                console.log(error.message);
                return { success: false, message: error.message };
            }
        });
    }
};
exports.userService = userService;
exports.userService = userService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [userRepository_1.userRepository,
        uploadService_1.s3Service,
        stripeService_1.stripeService,
        auctionRepository_1.auctionRepository,
        buyerService_1.buyer_service,
        paymentRepository_1.paymentRepository])
], userService);
