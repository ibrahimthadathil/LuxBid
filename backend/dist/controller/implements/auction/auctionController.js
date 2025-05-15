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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.auctionController = exports.AuctionController = void 0;
const typedi_1 = __importStar(require("typedi"));
const auctionService_1 = require("../../../service/implements/auction/auctionService");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const logger_utils_1 = require("@/utils/logger_utils");
let AuctionController = class AuctionController {
    constructor(auctionService) {
        this.auctionService = auctionService;
    }
    create_Auction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizer = req.user;
            const auction = req.body;
            try {
                if (organizer) {
                    const { message, success } = yield this.auctionService.create_Auction(auction, organizer);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.CREATED).json({ message, success });
                    else
                        res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message, success });
                }
                else
                    throw new Error(http_StatusCode_1.responseMessage.ACCESS_DENIED);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    get_Auctions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const organizer = req.user;
                if (organizer) {
                    const { success, data, message } = yield this.auctionService.getUserAll_Auction(organizer);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ success, data });
                    else
                        res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success, message });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    close_Auction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const organizer = req.user;
                const auctionId = req.params.id;
                if (organizer) {
                    const { message, success } = yield this.auctionService.close_Auction(auctionId);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ message, success });
                    else
                        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message: http_StatusCode_1.responseMessage.ACCESS_DENIED });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.INTERNAL_ERROR });
            }
        });
    }
    delete_Auction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auctionId = req.params.id;
                if (auctionId) {
                    const { message, success } = yield this.auctionService.delete_Auction(auctionId);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ success, message });
                    else
                        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
                }
                else
                    throw new Error(http_StatusCode_1.responseMessage.INVALID_INPUT);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE + error.message });
            }
        });
    }
    getTopAndDisplayAuctions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, data, message } = yield this.auctionService.getDisplay_Auctions();
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, data });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        });
    }
    view_Auction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const { success, data, message } = yield this.auctionService.view_Auction(id);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ data, success });
                    else
                        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
                }
                else
                    throw new Error(http_StatusCode_1.responseMessage.NOT_FOUND);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        });
    }
    auctoion_Interface(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                const { success, auction, message, organizer } = yield this.auctionService.auction_Interface(req.params.id, userId);
                if (organizer)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ data: { success, auction, organizer } });
                else if (!organizer)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ data: { success, auction, organizer } });
                else
                    res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE + error.message });
            }
        });
    }
    raiseBid_AMT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                const { amt, auctionId } = req.body;
                const { message, success } = yield this.auctionService.raiseBidAMT(amt, auctionId, userId);
                if (success) {
                    // this.socketService.emitToRoom(auctionId, "bidUpdated", { amt, userId });
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ message, success });
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE + error.message });
            }
        });
    }
    accept_BidAmt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userid, amt, auctionId } = req.body;
                const { message, success } = yield this.auctionService.acceptBidAmt(userid, amt, auctionId);
                if (success) {
                    // this.socketService.emitToRoom(auctionId, "bidAccepted", { userid, amt });
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ message, success });
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.INTERNAL_ERROR + error.message });
            }
        });
    }
    filtered_auction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, category, data, message } = yield this.auctionService.filterd_Auctions(req.query);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ data: { data, category } });
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE + error.message });
            }
        });
    }
    listByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auction = req.params.type;
                const { success, data, message } = yield this.auctionService.listBy_Type(auction);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, data });
                else
                    res.status(http_StatusCode_1.HttpStatus.NOT_FOUND).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE + error.message });
            }
        });
    }
};
exports.AuctionController = AuctionController;
exports.AuctionController = AuctionController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auctionService_1.auctionService])
], AuctionController);
exports.auctionController = typedi_1.default.get(AuctionController);
