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
exports.Organizer_Controller = void 0;
const typedi_1 = __importStar(require("typedi"));
const organizerService_1 = require("../../../service/implements/user/organizerService");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const logger_utils_1 = require("@/utils/logger_utils");
const cookie_utils_1 = require("@/utils/cookie_utils");
let organizerController = class organizerController {
    constructor(orgService) {
        this.orgService = orgService;
    }
    set_Organizer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerId = req.user;
                const { success, message, roleAccess } = yield this.orgService.set_Organizer(sellerId);
                if (success) {
                    (0, cookie_utils_1.setCookie)(res, 'authtkn', roleAccess);
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, message });
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log(error.message);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    get_Organizer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                if (userId) {
                    const { success, message, buyer, seller, avgRating } = yield this.orgService.get_Seller(userId);
                    if (success) {
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ data: [seller, buyer, avgRating] });
                    }
                    else
                        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message });
                }
                else {
                    console.log('kkk');
                    res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message: http_StatusCode_1.responseMessage.ACCESS_DENIED });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    finalize_Deal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const organizer = req === null || req === void 0 ? void 0 : req.user;
                const auctionId = req.params.id;
                const { success } = yield this.orgService.finalize_Auction(organizer, auctionId);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success });
                else
                    res.status(http_StatusCode_1.HttpStatus.SERVICE_UNAVAILABLE).json({ success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
};
organizerController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [organizerService_1.organizerService])
], organizerController);
exports.Organizer_Controller = typedi_1.default.get(organizerController);
