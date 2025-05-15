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
exports.categoryController = exports.CategoryController = void 0;
const typedi_1 = __importStar(require("typedi"));
const category_Service_1 = require("../../../service/implements/admin/category_Service");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const logger_utils_1 = require("@/utils/logger_utils");
let CategoryController = class CategoryController {
    constructor(cate_Service) {
        this.cate_Service = cate_Service;
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, isActive } = req.body;
                if (name) {
                    const { message, success } = yield this.cate_Service.add_Category(name, isActive);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.CREATED).json({ success, message });
                    else
                        throw new Error(message);
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success: false, message: http_StatusCode_1.responseMessage.INVALID_INPUT });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res
                    .status(http_StatusCode_1.HttpStatus.BAD_REQUEST)
                    .json({ message: error.message, success: false });
            }
        });
    }
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, data, message } = yield this.cate_Service.get_Category();
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ data, success });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    get_ListedCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, data, message } = yield this.cate_Service.get_ListedCategory();
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ data, success });
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success, message });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.INTERNAL_ERROR });
            }
        });
    }
    removeCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const { message, success } = yield this.cate_Service.remove_Category(id);
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
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                if (id) {
                    const { success, message } = yield this.cate_Service.category_Update(id);
                    if (success)
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ message, success });
                    else
                        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
                }
                else
                    throw new Error('Match not found');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
};
exports.CategoryController = CategoryController;
exports.CategoryController = CategoryController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [category_Service_1.categoryService])
], CategoryController);
exports.categoryController = typedi_1.default.get(CategoryController);
