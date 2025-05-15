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
exports.paymentRepository = void 0;
const typedi_1 = require("typedi");
const baseRepository_1 = require("../baseRepository");
const paymentModel_1 = require("@/models/paymentModel");
const logger_utils_1 = require("@/utils/logger_utils");
let paymentRepository = class paymentRepository extends baseRepository_1.BasRepository {
    constructor() {
        super(paymentModel_1.Payment);
    }
    updatePaymentStatus(sessionId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield paymentModel_1.Payment.findOneAndUpdate({ transactionId: sessionId }, updateData, { upsert: true, new: true });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('Failed to update payment status');
            }
        });
    }
    getUserTransactionHistory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield paymentModel_1.Payment.find({ userId })
                .sort({ paymentDate: -1 })
                .populate('auctionId', 'title');
        });
    }
    findPendingEntryFees(auctionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield paymentModel_1.Payment.find({
                auctionId,
                paymentType: paymentModel_1.paymentType.ENTRY_FEE,
                status: paymentModel_1.paymentStatus.COMPLETED
            });
        });
    }
    updatePayment(userId, auctionId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reponse = yield paymentModel_1.Payment.findOneAndUpdate({ auctionId, userId }, updateData, { upsert: true });
                return reponse;
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('Failed to update payment status ');
            }
        });
    }
};
exports.paymentRepository = paymentRepository;
exports.paymentRepository = paymentRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], paymentRepository);
