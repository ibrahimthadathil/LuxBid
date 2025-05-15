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
exports.organizerRepository = void 0;
const typedi_1 = require("typedi");
const organizerModel_1 = require("../../models/organizerModel");
const baseRepository_1 = require("./baseRepository");
const logger_utils_1 = require("@/utils/logger_utils");
let organizerRepository = class organizerRepository extends baseRepository_1.BasRepository {
    constructor() {
        super(organizerModel_1.Organizer);
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield organizerModel_1.Organizer.findOne({ user: userId })
                    .populate({ path: 'user', select: '-password' })
                    .populate({
                    path: 'rating.clint',
                    select: 'firstName profile',
                });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error('Error from finding Seller');
            }
        });
    }
    addRating(organizerId, clientId, rate, auctionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield organizerModel_1.Organizer.findOneAndUpdate({ user: organizerId }, {
                    $push: {
                        rating: {
                            clint: clientId,
                            rate: rate,
                            orderId: auctionId
                        }
                    }
                }, { new: true });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
            }
        });
    }
};
exports.organizerRepository = organizerRepository;
exports.organizerRepository = organizerRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], organizerRepository);
