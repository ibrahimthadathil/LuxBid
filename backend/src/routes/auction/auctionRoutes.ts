import { Router } from "express";
import { auction_Controller } from "../../controller/implements/auction/auctionController";
import { AuthMiddleWare } from "../../middleware/AuthMiddleware";

const auctionRoute = Router()

auctionRoute.post('/createAuction',AuthMiddleWare,auction_Controller.create_Auction.bind(auction_Controller))
auctionRoute.get('/auctions',AuthMiddleWare,auction_Controller.get_Auctions.bind(auction_Controller))
auctionRoute.put('/closeAuction/:id',AuthMiddleWare,auction_Controller.close_Auction.bind(auction_Controller))
auctionRoute.delete('/deleteAuction/:id',AuthMiddleWare,auction_Controller.delete_Auction.bind(auction_Controller))
auctionRoute.get('/displayAuction',auction_Controller.getTopAndDisplayAuctions.bind(auction_Controller))
auctionRoute.get('/viewAuction/:id',auction_Controller.view_Auction.bind(auction_Controller))
export default auctionRoute