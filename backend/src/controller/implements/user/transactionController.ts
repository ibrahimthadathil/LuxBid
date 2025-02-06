import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { transactionService } from "@/service/implements/user/transactionService";
import { AuthRequest } from "@/types/api";
import { logError } from "@/utils/logger_utils";
import { Response } from "express";
import Container, { Service } from "typedi";


@Service()
export class transactionController{
    constructor(
        private transactionService: transactionService
    ){}
    async getTransactionHistory(req:AuthRequest,res:Response){
        try {
            const {success,data,message} = await this.transactionService.getHistoryByuser(req.user as string)
            if(success)res.status(HttpStatus.OK).json({success,data})
            else res.status(HttpStatus.NOT_FOUND).json({message,success})
        } catch (error) {
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
        }
    }
}

export const transaction_Controller = Container.get(transactionController)