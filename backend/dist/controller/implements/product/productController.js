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
exports.productController = exports.ProductController = void 0;
const typedi_1 = __importStar(require("typedi"));
const productService_1 = require("../../../service/implements/product/productService");
const logger_utils_1 = require("@/utils/logger_utils");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
let ProductController = class ProductController {
    constructor(product_Service) {
        this.product_Service = product_Service;
    }
    create_Post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = req.files;
                const { message, success } = yield this.product_Service.create_Post(req.user, req.body, images);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.CREATED).json({ success, message });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    get_Post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                if (userId) {
                    const { success, message, data } = yield this.product_Service.findUser_Post(userId);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ success, data });
                    else
                        res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message });
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message: http_StatusCode_1.responseMessage.ACCESS_DENIED });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    findAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = req.params.status;
                const { success, data, message } = yield this.product_Service.findAll_Products(status === "true");
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success, data });
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    remove_Post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                if (id) {
                    const { success, message } = yield this.product_Service.remove_Post(id);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ message, success });
                    else
                        res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message, success });
                }
                else
                    throw new Error(http_StatusCode_1.responseMessage.NOT_FOUND);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message + http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    updatePostStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const { message, success } = yield this.product_Service.update_PostStatus(id);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ success, message });
                    else
                        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ success, message });
                }
                else
                    throw new Error(http_StatusCode_1.responseMessage.NOT_FOUND);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    rejectPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const { message, success } = yield this.product_Service.reject_Post(id);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ success, message });
                }
                else
                    throw new Error(http_StatusCode_1.responseMessage.NOT_FOUND);
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    update_Post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.id;
                const newImage = req.files;
                const data = req.body;
                const { message, success } = yield this.product_Service.update_post(postId, data, newImage);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ message, success });
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    approved_Post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user;
                if (!userId)
                    res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message: http_StatusCode_1.responseMessage.INVALID_REQUEST });
                const { success, data, message } = yield this.product_Service.approved_Post(userId);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ message, data });
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
};
exports.ProductController = ProductController;
exports.ProductController = ProductController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [productService_1.productService])
], ProductController);
exports.productController = typedi_1.default.get(ProductController);
