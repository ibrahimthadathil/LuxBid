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
exports.Message = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const MessageSchema = new mongoose_1.Schema({
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category", required: true },
    isAdmin: { type: Boolean },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    timestamp: { type: Date, default: Date.now, index: true },
    attachments: [String],
    replyTo: {
        messageId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Message" },
        content: { type: String },
        attachments: [String],
        user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }
    },
    emojis: [
        {
            emoji: { type: String, required: true },
            count: { type: Number, default: 0 },
            users: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }]
        }
    ]
});
MessageSchema.index({ category: 1, timestamp: -1 });
exports.Message = mongoose_1.default.model("Message", MessageSchema);
