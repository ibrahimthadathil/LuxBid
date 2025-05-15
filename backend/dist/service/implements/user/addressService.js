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
exports.addressService = void 0;
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const addressRepository_1 = require("@/repositories/implimentation/user/addressRepository");
const logger_utils_1 = require("@/utils/logger_utils");
const typedi_1 = require("typedi");
let addressService = class addressService {
    constructor(addressRepo) {
        this.addressRepo = addressRepo;
    }
    fetchaddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.addressRepo.fetchByUser(userId);
                if (response)
                    return { success: true, data: response };
                else
                    return { success: false, message: http_StatusCode_1.responseMessage.NOT_FOUND };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
    createAddress(userId, address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                address.user = userId;
                console.log('after user add :-', address);
                const response = yield this.addressRepo.create(address);
                if (response)
                    return { success: true, message: http_StatusCode_1.responseMessage.SUCCESS_MESSAGE };
                else
                    return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
    deleteAddress(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(addressId, 'ppp');
                const response = yield this.addressRepo.delete(addressId);
                if (response)
                    return { success: true, message: 'Deleted successfully' };
                else
                    return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
            catch (error) {
                console.log(';l;;;');
                (0, logger_utils_1.logError)(error);
                return { success: false, message: http_StatusCode_1.responseMessage.ERROR_MESSAGE };
            }
        });
    }
};
exports.addressService = addressService;
exports.addressService = addressService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [addressRepository_1.addressRepository])
], addressService);
