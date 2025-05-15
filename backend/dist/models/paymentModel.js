"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.paymentStatus = exports.paymentType = void 0;
const mongoose_1 = require("mongoose");
var paymentType;
(function (paymentType) {
    paymentType["ENTRY_FEE"] = "ENTRY_FEE";
    paymentType["REFUND"] = "REFUND";
    paymentType["WINNING_BID"] = "WINNING_BID";
})(paymentType || (exports.paymentType = paymentType = {}));
var paymentStatus;
(function (paymentStatus) {
    paymentStatus["PENDING"] = "PENDING";
    paymentStatus["COMPLETED"] = "COMPLETED";
    paymentStatus["FAILED"] = "FAILED";
    paymentStatus["REFUNDED"] = "REFUNDED";
})(paymentStatus || (exports.paymentStatus = paymentStatus = {}));
const paymentSchema = new mongoose_1.Schema({
    transactionId: { type: String, },
    amount: { type: Number, required: true },
    paymentType: {
        type: String,
        enum: Object.values(paymentType),
        required: true
    },
    status: {
        type: String,
        enum: Object.values(paymentStatus),
        default: paymentStatus.PENDING
    },
    paymentDate: { type: Date, default: Date.now },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    auctionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Auction', required: true },
});
const Payment = (0, mongoose_1.model)('Payment', paymentSchema);
exports.Payment = Payment;
