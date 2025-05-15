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
exports.messageRepository = void 0;
const chatModel_1 = require("@/models/chatModel");
const baseRepository_1 = require("../baseRepository");
const typedi_1 = require("typedi");
const logger_utils_1 = require("@/utils/logger_utils");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const mongoose_1 = require("mongoose");
let messageRepository = class messageRepository extends baseRepository_1.BasRepository {
    constructor() {
        super(chatModel_1.Message);
    }
    findAllChatsByCategory(groupId_1, page_1) {
        return __awaiter(this, arguments, void 0, function* (groupId, page, limit = 20) {
            try {
                return yield chatModel_1.Message.find({ category: groupId })
                    .populate({ path: "user", select: "firstName profile" })
                    .populate({ path: "replyTo.user", select: "firstName profile" })
                    .limit(limit * page);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error(http_StatusCode_1.responseMessage.ERROR_MESSAGE);
            }
        });
    }
    addReaction(messageId, emoji, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userObjectId = new mongoose_1.Types.ObjectId(userId);
                const message = yield chatModel_1.Message.findById(messageId);
                if (!message) {
                    throw new Error('Message not found');
                }
                const emojis = message.emojis || [];
                const existingEmojiIndex = emojis.findIndex(e => e.emoji === emoji);
                if (existingEmojiIndex >= 0) {
                    const userHasReacted = emojis[existingEmojiIndex].users.some(user => user.toString() === userObjectId.toString());
                    const updateOperation = userHasReacted
                        ? {
                            $inc: { [`emojis.${existingEmojiIndex}.count`]: -1 },
                            $pull: { [`emojis.${existingEmojiIndex}.users`]: userObjectId }
                        }
                        : {
                            $inc: { [`emojis.${existingEmojiIndex}.count`]: 1 },
                            $push: { [`emojis.${existingEmojiIndex}.users`]: userObjectId }
                        };
                    return yield chatModel_1.Message.findByIdAndUpdate(messageId, updateOperation, { new: true }).populate({ path: "user", select: 'firstName profile' });
                }
                else {
                    return yield chatModel_1.Message.findByIdAndUpdate(messageId, {
                        $push: {
                            emojis: {
                                emoji,
                                count: 1,
                                users: [userObjectId]
                            }
                        }
                    }, { new: true }).populate({ path: "user", select: 'firstName profile' });
                }
            }
            catch (error) {
                console.error('Error adding reaction:', error);
                throw error;
            }
        });
    }
};
exports.messageRepository = messageRepository;
exports.messageRepository = messageRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], messageRepository);
