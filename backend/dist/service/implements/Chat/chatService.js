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
exports.chatService = void 0;
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const category_Repository_1 = require("@/repositories/implimentation/admin/category_Repository");
const messageRepositury_1 = require("@/repositories/implimentation/chat/messageRepositury");
const logger_utils_1 = require("@/utils/logger_utils");
const typedi_1 = require("typedi");
const uploadService_1 = require("../user/uploadService");
let chatService = class chatService {
    constructor(categoryRepo, chatRepo, uploadService) {
        this.categoryRepo = categoryRepo;
        this.chatRepo = chatRepo;
        this.uploadService = uploadService;
    }
    fetchAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield this.categoryRepo.fetchgroup();
                if (groups)
                    return {
                        success: true,
                        data: groups,
                        message: http_StatusCode_1.responseMessage.SUCCESS_MESSAGE,
                    };
                else
                    throw new Error(http_StatusCode_1.responseMessage.NOT_FOUND);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
    getAllMessages(groupId, queries) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1 } = queries;
                const response = yield this.chatRepo.findAllChatsByCategory(groupId, page);
                if (response)
                    return { success: true, data: response };
                else
                    return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
    send_Message(groupId, content, user, files, replayTo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let attachments = [];
                if (files && files.length > 0) {
                    const uploadResult = yield this.uploadService.upload_File(files, 'chat-attachments');
                    attachments = Array.isArray(uploadResult)
                        ? uploadResult.map(result => result.Location)
                        : [uploadResult.Location];
                }
                let replayMessage = null;
                if (replayTo) {
                    const parentMessage = yield this.chatRepo.findById(replayTo);
                    if (parentMessage) {
                        replayMessage = {
                            messageId: parentMessage._id,
                            content: parentMessage.content || '',
                            attachments: parentMessage.attachments || [],
                            user: parentMessage.user
                        };
                    }
                }
                const response = yield this.chatRepo.create({
                    category: groupId,
                    user,
                    content,
                    attachments,
                    replyTo: replayMessage
                });
                if (response)
                    return {
                        success: true,
                        attachments
                    };
                else
                    return { success: false };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false };
            }
        });
    }
    addReaction(messageId, emoji, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.chatRepo.addReaction(messageId, emoji, userId);
                console.log(response);
                if (response) {
                    return { success: true, data: response };
                }
                return { success: false };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false };
            }
        });
    }
};
exports.chatService = chatService;
exports.chatService = chatService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [category_Repository_1.categoryRepository,
        messageRepositury_1.messageRepository,
        uploadService_1.s3Service])
], chatService);
