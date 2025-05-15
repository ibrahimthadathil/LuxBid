"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const auctionSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    seller: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    baseAmount: { type: Number, required: true },
    post: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true },
    bidders: [{
            user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
            bidTime: { type: Date },
            amount: { type: Number },
            isAccept: { type: Boolean, default: false },
            paymentSessionId: { type: String },
            paymentStatus: { type: String, default: 'pending' }
        }],
    endTime: { type: Date },
    startTime: { type: Date, default: Date.now() },
    auctionType: { type: String, enum: ['Live', 'Scheduled'], required: true },
    isActive: { type: Boolean, default: true },
    isSold: { type: Boolean, default: false },
    entryAmt: { type: Number, required: true }
});
exports.Auction = mongoose_1.default.model('Auction', auctionSchema);
