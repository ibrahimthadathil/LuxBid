import { Service } from "typedi";
import { Auction, IAuction } from "../../../models/auctionModel";
import { BasRepository } from "../baseRepository";

@Service()
export class auctionRepository extends BasRepository<IAuction>{

    constructor(){
        super(Auction)
    }
    async findByPost(id:string){
        try {
            return await Auction.findOne({post:id})
        } catch (error) {
            throw new Error('Failed to find auction')
        }
    }
}