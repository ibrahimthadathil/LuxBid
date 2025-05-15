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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const typedi_1 = __importStar(require("typedi"));
const userService_1 = require("@/service/implements/user/userService");
const stripeService_1 = require("@/service/implements/stripe/stripeService");
const stripe_1 = __importDefault(require("stripe"));
const logger_utils_1 = require("@/utils/logger_utils");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
let user_Controller = class user_Controller {
    constructor(userService, stripeService) {
        this.userService = userService;
        this.stripeService = stripeService;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    find_User(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { success, data } = yield this.userService.findUser(user);
                if (success) {
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success: true, data });
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ success: false, message: http_StatusCode_1.responseMessage.ACCESS_DENIED });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log("from error", error.message);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    upload_Profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                if (req.file && userId) {
                    const { message, success } = yield this.userService.upload_Profile(userId, req.file);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ success, message });
                    else
                        res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success, message });
                }
                else
                    res
                        .status(http_StatusCode_1.HttpStatus.BAD_REQUEST)
                        .json({ success: false, message: http_StatusCode_1.responseMessage.UPLOAD_FAILED });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res
                    .status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    edit_Profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                if (userId) {
                    const { message, success } = yield this.userService.edit_Profile(req.body, userId);
                    if (success) {
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ success, message });
                    }
                    else
                        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success: false, message: http_StatusCode_1.responseMessage.ACCESS_DENIED });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
            }
        });
    }
    make_Payment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, session } = yield this.userService.auction_JoinPayment(req.body, req.user);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, clientSecret: session === null || session === void 0 ? void 0 : session.client_secret });
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log('errr from stripe 121212');
                console.log(error.message);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    payment_Status(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const queryParams = req.query;
            try {
                const { success, data, message } = yield this.userService.auction_Join(queryParams, userId);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, data });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    webhook_Handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sig = req.headers['stripe-signature'];
            try {
                console.log('webhookHandler worked');
                if (!process.env.STRIPE_WEBHOOK_SECRET) {
                    throw new Error('Missing Stripe webhook secret');
                }
                const event = this.stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
                // Handle the webhook event
                yield this.stripeService.handleWebhook(event);
                res.json({ received: true });
            }
            catch (err) {
                (0, logger_utils_1.logError)(err);
                res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
            }
        });
    }
};
user_Controller = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [userService_1.userService,
        stripeService_1.stripeService])
], user_Controller);
exports.userController = typedi_1.default.get(user_Controller);
