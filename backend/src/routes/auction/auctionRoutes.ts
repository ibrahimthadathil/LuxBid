import { Router } from "express";
import { auction_Controller } from "../../controller/implements/auction/auctionController";
import { AuthMiddleWare } from "../../middleware/AuthMiddleware";

const auctionRoute = Router()

auctionRoute.post('/createAuction',AuthMiddleWare,auction_Controller.create_Auction.bind(auction_Controller))

export default auctionRoute