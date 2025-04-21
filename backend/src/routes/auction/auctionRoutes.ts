import { Router } from "express";
import { auctionController } from "@/controller/implements/auction/auctionController";
import { AuthMiddleWare } from "@/middleware/user/AuthMiddleware";
import { authorizationAccess } from "@/middleware/user/AuthorizationMiddleware";
import { OrganizerAuthMiddleware } from "@/middleware/user/organizerAuthmiddleware";
import { Organizer_Controller } from "@/controller/implements/user/organizerController";
import { apiLimiter } from "@/config/rateLimiter";

const auctionRoute = Router()
const bidLimitter = apiLimiter(10 * 60 * 1000, 5)
// Auction management
auctionRoute
 .post('/auctions',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,auctionController.create_Auction.bind(auctionController))
 .get('/auctions',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,auctionController.get_Auctions.bind(auctionController))
 .put('/auctions/:id/close',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,auctionController.close_Auction.bind(auctionController))
 .delete('/auctions/:id',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,auctionController.delete_Auction.bind(auctionController))
 .get('/auctions/display',auctionController.getTopAndDisplayAuctions.bind(auctionController))
 .get('/auctions/:id',auctionController.view_Auction.bind(auctionController))
 .get('/auctions/:id/interface',AuthMiddleWare,auctionController.auctoion_Interface.bind(auctionController))
// bidding routes
auctionRoute
 .post('/bids/raise',AuthMiddleWare,bidLimitter,auctionController.raiseBid_AMT.bind(auctionController))
 .post('/bids/accept',AuthMiddleWare,auctionController.accept_BidAmt.bind(auctionController))
auctionRoute
 .get('/AllDeals',auctionController.filtered_auction.bind(auctionController))
 .post('/auctions/:id/finalize',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,Organizer_Controller.finalize_Deal.bind(Organizer_Controller))



export default auctionRoute