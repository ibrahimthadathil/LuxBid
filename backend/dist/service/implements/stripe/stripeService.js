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
exports.stripeService = void 0;
const paymentModel_1 = require("@/models/paymentModel");
const auctionRepository_1 = require("@/repositories/implimentation/auction/auctionRepository");
const paymentRepository_1 = require("@/repositories/implimentation/user/paymentRepository");
const logger_utils_1 = require("@/utils/logger_utils");
const stripe_1 = __importDefault(require("stripe"));
const typedi_1 = require("typedi");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-11-20.acacia",
});
let stripeService = class stripeService {
    constructor(auctionRepo, paymentRepo) {
        this.auctionRepo = auctionRepo;
        this.paymentRepo = paymentRepo;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    makePaymentSession(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentItems = [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: String(data.title),
                                images: data.img ? [String(data.img)] : [],
                            },
                            unit_amount: data.price * 100,
                        },
                        // quantity: data.quantity || 1,
                        quantity: typeof data.quantity === "number"
                            ? data.quantity
                            : parseInt(String(data.quantity)) || 1,
                    },
                ];
                const session = yield stripe.checkout.sessions.create({
                    ui_mode: "embedded",
                    line_items: paymentItems,
                    mode: "payment",
                    return_url: data.address ? `${process.env.SERVER_URL}/return?session_id={CHECKOUT_SESSION_ID}&aid=${data.id}&order=${true}` : `${process.env.SERVER_URL}/return?session_id={CHECKOUT_SESSION_ID}&aid=${data.id}`,
                    metadata: {
                        aid: String(data.id),
                        userId: userId,
                    },
                });
                // console.log("payent details :-", session);
                return session;
            }
            catch (error) {
                console.log("11111", error.message);
                throw new Error("Failed to create payment session");
            }
        });
    }
    payment_Status(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield stripe.checkout.sessions.retrieve(query.session_id);
                return session;
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error("Failed to complee the payment");
            }
        });
    }
    handleWebhook(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received webhook event:", event.type);
                switch (event.type) {
                    case "checkout.session.completed": {
                        const session = event.data.object;
                        yield this.handleSuccessfulPayment(session);
                        break;
                    }
                    case "checkout.session.expired":
                        yield this.handleFailedPayment(event.data.object);
                        break;
                    case "charge.refunded":
                        yield this.handleRefundComplete(event.data.object);
                        break;
                    case "charge.updated":
                        break;
                    default:
                        console.log(`Unhandled event type: ${event.type}`);
                }
                return { success: true };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw error;
            }
        });
    }
    handleSuccessfulPayment(session) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const auctionId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.aid;
                const userId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.userId;
                // const paymentIntentId = session.payment_intent as string;
                if (!auctionId || !userId) {
                    throw new Error("Missing metadata in session");
                }
                // Update auction payment status
                yield this.auctionRepo.updatePaymentStatus(auctionId, userId, "completed");
                console.log(`userid :- ${userId} auctionid :- ${auctionId} , sessionid :-${session.id}`);
                // Update payment record
                const f = yield this.paymentRepo.updatePaymentStatus(session.id, { status: paymentModel_1.paymentStatus.COMPLETED });
                console.log(f, '@@ from the successpayment');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw error;
            }
        });
    }
    processAuctionRefunds(auctionId, winnerUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield this.paymentRepo.findPendingEntryFees(auctionId);
                const auction = yield this.auctionRepo.findById(auctionId);
                if (!auction)
                    throw new Error("Auction not found");
                for (const payment of payments) {
                    if (payment.userId.toString() !== winnerUserId) {
                        // Process refund for non-winners
                        const refund = yield this.stripe.refunds.create({
                            payment_intent: payment.transactionId,
                        });
                        // Create refund record
                        yield this.paymentRepo.create({
                            transactionId: refund.id,
                            amount: payment.amount,
                            paymentType: paymentModel_1.paymentType.REFUND,
                            userId: payment.userId.toString(),
                            auctionId: auction._id.toString(),
                            auctionTitle: auction.title,
                            status: paymentModel_1.paymentStatus.PENDING,
                        });
                    }
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw error;
            }
        });
    }
    handleRefundComplete(charge) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const refundId = (_a = charge === null || charge === void 0 ? void 0 : charge.refunds) === null || _a === void 0 ? void 0 : _a.data[0].id;
                yield this.paymentRepo.updatePaymentStatus(refundId, { status: paymentModel_1.paymentStatus.REFUNDED });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw error;
            }
        });
    }
    handleFailedPayment(session) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const auctionId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.aid;
                const userId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.userId;
                console.log("metadatas:-", auctionId, userId);
                if (!auctionId || !userId) {
                    throw new Error("Missing metadata in session");
                }
                const auction = yield this.auctionRepo.findById(auctionId);
                if (!auction) {
                    throw new Error("Auction not found");
                }
                const bidderIndex = auction.bidders.findIndex((bidder) => bidder.user.toString() === userId);
                if (bidderIndex !== -1) {
                    auction.bidders[bidderIndex].paymentStatus = "failed";
                    yield auction.save();
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw error;
            }
        });
    }
};
exports.stripeService = stripeService;
exports.stripeService = stripeService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auctionRepository_1.auctionRepository,
        paymentRepository_1.paymentRepository])
], stripeService);
