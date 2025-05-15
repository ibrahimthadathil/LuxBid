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
exports.order_Contoller = exports.orderController = void 0;
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const orderService_1 = require("@/service/implements/order/orderService");
const logger_utils_1 = require("@/utils/logger_utils");
const typedi_1 = __importStar(require("typedi"));
let orderController = class orderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    makeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { price, title, img, id, address } = req.body;
                const userId = req.user;
                const { session, success, message } = yield this.orderService.createOrderPayment({ price, title, img, id, address }, userId);
                console.log(success, message, '😶‍🌫️😶‍🌫️');
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, clientSecret: session === null || session === void 0 ? void 0 : session.client_secret });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ success: false, message: message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    paymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                const queryParams = req.query;
                const { success, data, message } = yield this.orderService.placeOrder(queryParams, userId);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, data, message });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    fetchOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                const { success, data, message } = yield this.orderService.getAllOrders(userId);
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
    dispatchOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, data } = yield this.orderService.getDispatchOrders(req.user);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ data, success });
                else
                    res.status(http_StatusCode_1.HttpStatus.SERVICE_UNAVAILABLE).json({ success, message: http_StatusCode_1.responseMessage.NOT_FOUND });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    placeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success } = yield this.orderService.changeOrderStatus(req.body);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, message: `order has been ${req.body.value}` });
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    rateSeller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId, rating } = req.body;
                const { success, message } = yield this.orderService.addRating(orderId, rating, req.user);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, message });
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
};
exports.orderController = orderController;
exports.orderController = orderController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [orderService_1.OrderService])
], orderController);
exports.order_Contoller = typedi_1.default.get(orderController);
