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
exports.address_Controller = exports.AddressController = void 0;
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const addressService_1 = require("@/service/implements/user/addressService");
const logger_utils_1 = require("@/utils/logger_utils");
const typedi_1 = __importStar(require("typedi"));
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    fetchAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, data, message } = yield this.addressService.fetchaddress(req.user);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ message, data, success });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res
                    .status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    createAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, success } = yield this.addressService.createAddress(req.user, req.body);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ message, success });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res
                    .status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, success } = yield this.addressService.deleteAddress(req.params.id);
                if (success)
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ message, success });
                else
                    res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message, success });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res
                    .status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
};
exports.AddressController = AddressController;
exports.AddressController = AddressController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [addressService_1.addressService])
], AddressController);
exports.address_Controller = typedi_1.default.get(AddressController);
