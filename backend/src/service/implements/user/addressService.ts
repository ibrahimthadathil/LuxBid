import { responseMessage } from "@/enums/http_StatusCode";
import { IAddress } from "@/models/addressModel";
import { addressRepository } from "@/repositories/implimentation/user/addressRepository";
import { logError } from "@/utils/logger_utils";
import { Service } from "typedi";

@Service()
export class addressService{
    constructor(
        private addressRepo :addressRepository
    ){}

    async fetchaddress(userId:string){
        try {
           const response = await this.addressRepo.fetchByUser(userId)
           if(response)return {success:true, data:response}
           else return {success:false , message:responseMessage.NOT_FOUND}
        } catch (error) {
            logError(error)
            return {success:false , message:responseMessage.ERROR_MESSAGE}
        }
    }
    async createAddress(userId:string,address:Partial<IAddress>){
        try {
            address.user = userId
            const response = await this.addressRepo.create(address)
            if(response)return {success:true,message:responseMessage.SUCCESS_MESSAGE}
            else return {success:false , message:responseMessage.ERROR_MESSAGE}
        } catch (error) {
            logError(error)
            return {success:false , message:responseMessage.ERROR_MESSAGE}
        }
    }
    async deleteAddress(addressId:string){
        try {
            
          const response= await this.addressRepo.delete(addressId)
          if(response) return {success:true,message:'Deleted successfully'}
          else return {success:false , message:responseMessage.ERROR_MESSAGE}
        } catch (error) {
            
            logError(error)
            return {success:false , message:responseMessage.ERROR_MESSAGE}
        }
    }
}

