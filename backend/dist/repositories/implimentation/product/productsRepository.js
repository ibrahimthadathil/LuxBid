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
exports.productRepository = void 0;
const typedi_1 = require("typedi");
const productModel_1 = require("../../../models/productModel");
const baseRepository_1 = require("../baseRepository");
const logger_utils_1 = require("@/utils/logger_utils");
let productRepository = class productRepository extends baseRepository_1.BasRepository {
    constructor() {
        super(productModel_1.Product);
    }
    findByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const f = yield productModel_1.Product.find({ seller: id }).populate({ path: 'category', match: { isActive: true } });
                return f;
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('errofrom fetching the products');
            }
        });
    }
    findByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productModel_1.Product.find({ isApproved: status }).populate('seller', '-password').populate('category');
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('failed to find  post');
            }
        });
    }
    findByApproved(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productModel_1.Product.find({ seller: id, isApproved: true });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('failed to findApproved post');
            }
        });
    }
};
exports.productRepository = productRepository;
exports.productRepository = productRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], productRepository);
