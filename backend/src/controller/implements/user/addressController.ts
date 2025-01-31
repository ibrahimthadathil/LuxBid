import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { addressService } from "@/service/implements/user/addressService";
import { AuthRequest } from "@/types/api";
import { logError } from "@/utils/logger_utils";
import { Response } from "express";
import Container, { Service } from "typedi";


@Service()
export class addressController {

    constructor(
        private addressService :addressService
    ){}

    async fetchAddress(req:AuthRequest,res:Response){
       try {
        const {success,data,message} =await this.addressService.fetchaddress(req.user as string)
        if(success)res.status(HttpStatus.OK).json({message,data,success})
            else res.status(HttpStatus.BAD_REQUEST).json({message,success})
       } catch (error) {
        logError(error)
        res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: responseMessage.ERROR_MESSAGE })
       } 
    }
    async createAddress(req:AuthRequest,res:Response){
        try {
            console.log('entered');
            
          const {message,success} = await this.addressService.createAddress(req.user as string ,req.body)
          if(success)res.status(HttpStatus.OK).json({message,success})
            else res.status(HttpStatus.BAD_REQUEST).json({message,success})
        } catch (error) {
            logError(error)
            res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: responseMessage.ERROR_MESSAGE })
        }
    }


}

export const address_Controller = Container.get(addressController)