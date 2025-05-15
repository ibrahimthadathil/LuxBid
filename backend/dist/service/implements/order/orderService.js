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
exports.OrderService = void 0;
const orderRepository_1 = require("@/repositories/implimentation/order/orderRepository");
const typedi_1 = require("typedi");
const stripeService_1 = require("../stripe/stripeService");
const auctionRepository_1 = require("@/repositories/implimentation/auction/auctionRepository");
const logger_utils_1 = require("@/utils/logger_utils");
const paymentRepository_1 = require("@/repositories/implimentation/user/paymentRepository");
const paymentModel_1 = require("@/models/paymentModel");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const organizerRepository_1 = require("@/repositories/implimentation/organizerRepository");
let OrderService = class OrderService {
    constructor(orderRepo, stripeService, auctionRepo, paymentRepo, organizerRepo) {
        this.orderRepo = orderRepo;
        this.stripeService = stripeService;
        this.auctionRepo = auctionRepo;
        this.paymentRepo = paymentRepo;
        this.organizerRepo = organizerRepo;
    }
    createOrderPayment(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exists = yield this.orderRepo.findByField('auction', data.id);
                console.log(exists, 'exists');
                if (exists)
                    return { success: false, message: 'Already made the payment' };
                const deductionAmount = yield this.auctionRepo.findById(data.id);
                const finalPrice = parseInt(data.price) - deductionAmount.entryAmt;
                const paymentData = Object.assign(Object.assign({}, data), { price: finalPrice });
                const session = yield this.stripeService.makePaymentSession(paymentData, userId);
                if (session) {
                    const exist = yield this.orderRepo.findByField('auction', data.id);
                    if (!exist) {
                        yield this.orderRepo.create({ user: userId, auction: data.id, orderAmt: finalPrice, paymentStatus: 'Pending', orderStatus: 'Pending', shippingAddress: data.address });
                        yield this.paymentRepo.create({ transactionId: session.id, amount: finalPrice, paymentType: paymentModel_1.paymentType.WINNING_BID, userId, auctionId: data.id });
                    }
                    return { success: true, session };
                }
                else
                    return { success: false, message: "Failed to make payment" };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log("11111", error.message);
                return { success: false, message: error.message };
            }
        });
    }
    placeOrder(query, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.stripeService.payment_Status(query);
                const data = {
                    status: response.status,
                    customer_email: (_a = response.customer_details) === null || _a === void 0 ? void 0 : _a.email,
                };
                console.log(data);
                if (response.status == 'complete') {
                    const commitedAuction = yield this.auctionRepo.findById(query.aid);
                    const deductionAmout = (commitedAuction === null || commitedAuction === void 0 ? void 0 : commitedAuction.baseAmount) - (commitedAuction === null || commitedAuction === void 0 ? void 0 : commitedAuction.entryAmt);
                    console.log(`userid : - ${userId} , auctionid:- ${query.aid} `);
                    const updatePaymentStatus = yield this.paymentRepo.updatePayment(userId, query.aid, { status: paymentModel_1.paymentStatus.COMPLETED, amount: deductionAmout });
                    console.log(updatePaymentStatus, 'payment');
                    yield this.auctionRepo.update(query.aid, { isSold: true });
                    const updateOrder = yield this.orderRepo.findByField('auction', query.aid);
                    if (updateOrder) {
                        console.log(updatePaymentStatus, '11');
                        yield this.orderRepo.update(updateOrder._id, { paymentStatus: 'Success' });
                        return { success: true, data, message: 'Order Placed' };
                    }
                    else
                        throw new Error('Failed to complete payment');
                }
                else
                    throw new Error("Failed to complete The Order");
            }
            catch (error) {
                console.log(error.message);
                return { success: false, message: error.message };
            }
        });
    }
    getAllOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderRepo.findOrdersByUser(userId);
                if (response)
                    return { success: true, data: response };
                else
                    return { success: false, message: http_StatusCode_1.responseMessage.NOT_FOUND };
            }
            catch (error) {
                console.log(error.message);
                return { success: false, message: error.message };
            }
        });
    }
    getDispatchOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderRepo.getDispatchOrders(userId);
                if (response)
                    return { success: true, data: response };
                else
                    return { success: false, Message: http_StatusCode_1.responseMessage.INVALID_REQUEST };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, Message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
    changeOrderStatus(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.orderRepo.update(data.order, { orderStatus: data.value });
                if (response)
                    return { success: true };
                else
                    return { success: false };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, Message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
    addRating(orderId, rating, clintId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.orderRepo.findById(orderId, 'auction');
                const response = yield this.organizerRepo.addRating(order.auction.seller, clintId, rating, orderId);
                if (response) {
                    return { success: true, message: 'Rating updated' };
                }
                else
                    return { success: false, message: 'failed' };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [orderRepository_1.OrderRepository,
        stripeService_1.stripeService,
        auctionRepository_1.auctionRepository,
        paymentRepository_1.paymentRepository,
        organizerRepository_1.organizerRepository])
], OrderService);
