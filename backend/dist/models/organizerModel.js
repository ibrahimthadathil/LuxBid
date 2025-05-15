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
exports.Organizer = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const OrganizerSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: [{
            clint: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
            rate: { type: Number, default: 0 },
            orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Order' }
        }],
    // products:{type: mongoose.Schema.Types.ObjectId } ,
    // auctions:{type: mongoose.Schema.Types.ObjectId , 'ref' : 'Auction' }
}, { timestamps: true });
exports.Organizer = mongoose_1.default.model('Organizer', OrganizerSchema);
