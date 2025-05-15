"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auctionController_1 = require("@/controller/implements/auction/auctionController");
const AuthMiddleware_1 = require("@/middleware/user/AuthMiddleware");
const AuthorizationMiddleware_1 = require("@/middleware/user/AuthorizationMiddleware");
const organizerAuthmiddleware_1 = require("@/middleware/user/organizerAuthmiddleware");
const organizerController_1 = require("@/controller/implements/user/organizerController");
const rateLimiter_1 = require("@/config/rateLimiter");
const auctionRoute = (0, express_1.Router)();
const bidLimitter = (0, rateLimiter_1.apiLimiter)(10 * 60 * 1000, 5);
// Auction management
auctionRoute
    .post('/auctions', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, organizerAuthmiddleware_1.OrganizerAuthMiddleware, auctionController_1.auctionController.create_Auction.bind(auctionController_1.auctionController))
    .get('/auctions', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, organizerAuthmiddleware_1.OrganizerAuthMiddleware, auctionController_1.auctionController.get_Auctions.bind(auctionController_1.auctionController))
    .put('/auctions/:id/close', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, organizerAuthmiddleware_1.OrganizerAuthMiddleware, auctionController_1.auctionController.close_Auction.bind(auctionController_1.auctionController))
    .delete('/auctions/:id', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, organizerAuthmiddleware_1.OrganizerAuthMiddleware, auctionController_1.auctionController.delete_Auction.bind(auctionController_1.auctionController))
    .get('/auctions/display', auctionController_1.auctionController.getTopAndDisplayAuctions.bind(auctionController_1.auctionController))
    .get('/auctions/:id', auctionController_1.auctionController.view_Auction.bind(auctionController_1.auctionController))
    .get('/auctions/:id/interface', AuthMiddleware_1.AuthMiddleWare, auctionController_1.auctionController.auctoion_Interface.bind(auctionController_1.auctionController));
// bidding routes
auctionRoute
    .post('/bids/raise', AuthMiddleware_1.AuthMiddleWare, bidLimitter, auctionController_1.auctionController.raiseBid_AMT.bind(auctionController_1.auctionController))
    .post('/bids/accept', AuthMiddleware_1.AuthMiddleWare, auctionController_1.auctionController.accept_BidAmt.bind(auctionController_1.auctionController));
auctionRoute
    .get('/AllDeals', auctionController_1.auctionController.filtered_auction.bind(auctionController_1.auctionController))
    .post('/auctions/:id/finalize', AuthMiddleware_1.AuthMiddleWare, AuthorizationMiddleware_1.authorizationAccess, organizerAuthmiddleware_1.OrganizerAuthMiddleware, organizerController_1.Organizer_Controller.finalize_Deal.bind(organizerController_1.Organizer_Controller));
exports.default = auctionRoute;
