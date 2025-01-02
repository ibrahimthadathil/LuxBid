import { Router } from "express";
import { auction_Controller } from "@/controller/implements/auction/auctionController";
import { AuthMiddleWare } from "@/middleware/user/AuthMiddleware";
import { authorizationAccess } from "@/middleware/user/AuthorizationMiddleware";
import { OrganizerAuthMiddleware } from "@/middleware/user/organizerAuthmiddleware";
import { Organizer_Controller } from "@/controller/implements/user/organizerController";

const auctionRoute = Router()

auctionRoute.post('/createAuction',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,auction_Controller.create_Auction.bind(auction_Controller))
auctionRoute.get('/auctions',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,auction_Controller.get_Auctions.bind(auction_Controller))
auctionRoute.put('/closeAuction/:id',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,auction_Controller.close_Auction.bind(auction_Controller))
auctionRoute.delete('/deleteAuction/:id',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,auction_Controller.delete_Auction.bind(auction_Controller))
auctionRoute.get('/displayAuction',auction_Controller.getTopAndDisplayAuctions.bind(auction_Controller))
auctionRoute.get('/viewAuction/:id',auction_Controller.view_Auction.bind(auction_Controller))
auctionRoute.get('/auctionInterface/:id',AuthMiddleWare,auction_Controller.auctoion_Interface.bind(auction_Controller))
auctionRoute.post('/raise-bid-amt',AuthMiddleWare,auction_Controller.raiseBid_AMT.bind(auction_Controller))
auctionRoute.post('/accept-bidAmt',AuthMiddleWare,auction_Controller.accept_BidAmt.bind(auction_Controller))
auctionRoute.get('/AllDeals',auction_Controller.filtered_auction.bind(auction_Controller))

auctionRoute.post('/finalize-deal/:id',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware ,Organizer_Controller.finalize_Deal.bind(Organizer_Controller))

export default auctionRoute