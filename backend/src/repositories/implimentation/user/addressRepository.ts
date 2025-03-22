import { Service } from "typedi";
import { BasRepository } from "../baseRepository";
import { AddressModel, IAddress } from "@/models/addressModel";
import { logError } from "@/utils/logger_utils";
import { responseMessage } from "@/enums/http_StatusCode";



@Service()
export class addressRepository extends BasRepository<IAddress>{

    constructor(){
        super(AddressModel)
    }
    async fetchByUser(userId:string){
        try {
            return await AddressModel.find({user:userId})
        } catch (error) {
            logError(error)
            throw new Error(responseMessage.ERROR_MESSAGE);
            
        }
    }

}