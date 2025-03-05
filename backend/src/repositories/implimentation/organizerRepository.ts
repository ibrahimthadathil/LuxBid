import { Service } from "typedi";
import { ISeller, Organizer } from "../../models/organizerModel";
import { BasRepository } from "./baseRepository";
import { networkInterfaces } from "os";
import { logError } from "@/utils/logger_utils";

@Service()
export class organizerRepository extends BasRepository<ISeller>{

    constructor(){
        super(Organizer)
    }
    async findUserById(userId:string){
        try {            
            return await Organizer.findOne({user:userId})
            .populate({path:'user',select:'-password'})
            .populate({
                path: 'rating.clint', 
                select: 'firstName profile', 
              });
        } catch (error) {
            throw new Error('Error from finding Seller')
        }
    }
    async addRating(organizerId: string, clientId: string, rate: number, auctionId: string){
        try {
            return await Organizer.findOneAndUpdate (
                {user:organizerId},
                {
                    $push: {
                        rating: {
                            clint: clientId,
                            rate: rate,
                            orderId: auctionId
                        }
                    }
                },
                { new: true } 
            );
        } catch (error) {
            logError(error)
        }
    }

}