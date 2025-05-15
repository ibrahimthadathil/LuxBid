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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const AuthMiddleware_1 = require("@/middleware/user/AuthMiddleware");
const userController_1 = require("@/controller/implements/user/userController");
const buyerController_1 = require("@/controller/implements/user/buyerController");
const organizerController_1 = require("@/controller/implements/user/organizerController");
const multer_Utils_1 = require("@/utils/multer_Utils");
const AuthorizationMiddleware_1 = require("@/middleware/user/AuthorizationMiddleware");
const BuyerAuthMiddleware_1 = require("@/middleware/user/BuyerAuthMiddleware");
const organizerAuthmiddleware_1 = require("@/middleware/user/organizerAuthmiddleware");
const transactionController_1 = require("@/controller/implements/user/transactionController");
const userRoute = (0, express_1.Router)();
userRoute.get('/user', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, userController_1.userController.find_User.bind(userController_1.userController));
userRoute.put('/setbuyer', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, buyerController_1.buyer_controller.set_Buyer.bind(buyerController_1.buyer_controller));
userRoute.put('/setseller', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, organizerController_1.Organizer_Controller.set_Organizer.bind(organizerController_1.Organizer_Controller));
userRoute.get('/buyer', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, BuyerAuthMiddleware_1.buyerAuthMiddleware, buyerController_1.buyer_controller.get_Buyer.bind(buyerController_1.buyer_controller));
userRoute.get('/seller', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, organizerAuthmiddleware_1.OrganizerAuthMiddleware, organizerController_1.Organizer_Controller.get_Organizer.bind(organizerController_1.Organizer_Controller));
userRoute.post('/uploadprofile', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, multer_Utils_1.upload.single('image'), userController_1.userController.upload_Profile.bind(userController_1.userController));
userRoute.post('/editprofile', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, userController_1.userController.edit_Profile.bind(userController_1.userController));
userRoute.get('/allBids', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, BuyerAuthMiddleware_1.buyerAuthMiddleware, buyerController_1.buyer_controller.committed_Auction.bind(buyerController_1.buyer_controller));
userRoute.get('/find-won-auction', AuthMiddleware_1.AuthMiddleWare, BuyerAuthMiddleware_1.buyerAuthMiddleware, buyerController_1.buyer_controller.getWon_Auctions.bind(buyerController_1.buyer_controller));
// stripe route 
userRoute.post('/create-checkout-session', AuthMiddleware_1.AuthMiddleWare, userController_1.userController.make_Payment.bind(userController_1.userController));
userRoute.get('/session-status', AuthMiddleware_1.AuthMiddleWare, userController_1.userController.payment_Status.bind(userController_1.userController));
userRoute.post('/webhook', express_1.default.raw({ type: 'application/json' }), userController_1.userController.webhook_Handler.bind(userController_1.userController));
userRoute.get('/transactionHistory', AuthMiddleware_1.AuthMiddleWare, transactionController_1.transaction_Controller.getTransactionHistory.bind(transactionController_1.transaction_Controller));
userRoute.post('/winning-bid-payment', AuthMiddleware_1.AuthMiddleWare);
exports.default = userRoute;
