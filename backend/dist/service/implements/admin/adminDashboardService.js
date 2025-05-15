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
exports.adminDashboardService = void 0;
const auctionRepository_1 = require("@/repositories/implimentation/auction/auctionRepository");
const orderRepository_1 = require("@/repositories/implimentation/order/orderRepository");
const userRepository_1 = require("@/repositories/implimentation/userRepository");
const typedi_1 = require("typedi");
let adminDashboardService = class adminDashboardService {
    constructor(userRepo, auctionRepo, orderRepo) {
        this.userRepo = userRepo;
        this.auctionRepo = auctionRepo;
        this.orderRepo = orderRepo;
    }
    dashboardDatas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepo.usersByGender();
                const topFiveAuctions = yield this.auctionRepo.findTopAuctions();
                const totalOrders = yield this.orderRepo.findAll();
                const topSellers = yield this.auctionRepo.topAuctionsBuyUser();
                const totalSales = yield this.orderRepo.totalSales();
                const groupAuctionsByType = yield this.auctionRepo.groupAuctionsByType();
                return {
                    success: true,
                    users: users[0].genderStatus,
                    totalUsers: users[0].totalUsers,
                    topFiveAuctions,
                    totalOrders: totalOrders.length,
                    topSellers,
                    totalSales,
                    groupAuctionsByType
                };
            }
            catch (error) {
                return { success: false, message: error.message };
            }
        });
    }
};
exports.adminDashboardService = adminDashboardService;
exports.adminDashboardService = adminDashboardService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [userRepository_1.userRepository,
        auctionRepository_1.auctionRepository,
        orderRepository_1.OrderRepository])
], adminDashboardService);
