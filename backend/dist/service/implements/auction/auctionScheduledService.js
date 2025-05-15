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
exports.scheduledAuctionService = void 0;
const agendaConfig_1 = require("@/config/agendaConfig");
const auctionRepository_1 = require("@/repositories/implimentation/auction/auctionRepository");
const logger_utils_1 = require("@/utils/logger_utils");
const typedi_1 = require("typedi");
let scheduledAuctionService = class scheduledAuctionService {
    constructor(auctionRepo) {
        this.auctionRepo = auctionRepo;
        agendaConfig_1.agendaInstance.define('close auction', (job) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { auctionId } = job.attrs.data;
                yield this.auctionRepo.update(auctionId, { isActive: false });
            }
            catch (error) {
                (0, logger_utils_1.logError)('error in close auction ' + error.message);
            }
        }));
    }
    scheduleAuctionClosure(auctionId, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield agendaConfig_1.agendaInstance.schedule(endTime, "close auction", { auctionId });
                console.log(`Scheduled auction will end on time`);
            }
            catch (error) {
                (0, logger_utils_1.logError)(`${error.message}`);
            }
        });
    }
};
exports.scheduledAuctionService = scheduledAuctionService;
exports.scheduledAuctionService = scheduledAuctionService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auctionRepository_1.auctionRepository])
], scheduledAuctionService);
