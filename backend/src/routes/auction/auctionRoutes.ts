import { Router } from "express";
import { auction_Controller } from "../../controller/implements/auction/auctionController";

const auctionRoute = Router()

auctionRoute.post('/createAuction',auction_Controller.create_Auction.bind(auction_Controller))

export default auctionRoute