import Container, { Service } from "typedi";
import { auctionService } from "../../../service/implements/auction/auctionService";
import { AuthRequest } from "../../../types/api";
import { Request, Response } from "express";
import { IAuction } from "../../../models/auctionModel";
import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { logError } from "@/utils/logger_utils";

@Service()
export class AuctionController {
  constructor(private auctionService: auctionService) {}
  
  async create_Auction(req:AuthRequest,res:Response){
    const organizer = req.user 
    const auction = req.body as IAuction
    try {
    if(organizer){      
     const {message,success} = await this.auctionService.create_Auction(auction,organizer as string)
     if(success)res.status(HttpStatus.CREATED).json({message,success})
      else res.status(HttpStatus.UNAUTHORIZED).json({message,success})
    }else throw new Error(responseMessage.ACCESS_DENIED)  
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
    }  
  }
  async get_Auctions(req:AuthRequest,res:Response){
    try {
      const organizer = req.user
      if(organizer){
       const {success,data,message}= await this.auctionService.getUserAll_Auction(organizer as string)       
       if(success)res.status(HttpStatus.OK).json({success,data})
        else res.status(HttpStatus.UNAUTHORIZED).json({success,message})
      }
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async close_Auction(req:AuthRequest,res:Response){

    try {
      const organizer = req.user 
      const auctionId = req.params.id
      if(organizer){
       const {message,success}= await this.auctionService.close_Auction(auctionId)
       if(success)res.status(HttpStatus.OK).json({message,success})
        else res.status(HttpStatus.BAD_REQUEST).json({message,success})
      }else res.status(HttpStatus.FORBIDDEN).json({message:responseMessage.ACCESS_DENIED})
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.INTERNAL_ERROR})
    }
  }
  async delete_Auction(req:AuthRequest,res:Response){
    try {
      const auctionId = req.params.id 
      if(auctionId){
       const {message,success} = await this.auctionService.delete_Auction(auctionId)
       if(success)res.status(HttpStatus.OK).json({success,message})
        else res.status(HttpStatus.BAD_REQUEST).json({message,success})
      }else throw new Error(responseMessage.INVALID_INPUT)
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE+(error as Error).message})
    }
  }
  async getTopAndDisplayAuctions(req:Request,res:Response){
    try {
      const {success,data,message} =await this.auctionService.getDisplay_Auctions()
      if(success)res.status(HttpStatus.OK).json({success,data})
        else res.status(HttpStatus.BAD_REQUEST).json({success,message})
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
  }
  async view_Auction(req:AuthRequest,res:Response){
    try {
      const id = req.params.id
      if(id){
        const {success,data,message}= await this.auctionService.view_Auction(id)
        if(success)res.status(HttpStatus.OK).json({data,success})
        else res.status(HttpStatus.BAD_REQUEST).json({message,success})
      }else throw new Error(responseMessage.NOT_FOUND)
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:(error as Error).message})
    }
  }
  async auctoion_Interface(req:AuthRequest,res:Response){
    try {
      const userId = req.user
      const {success,auction,message,organizer}=await this.auctionService.auction_Interface(req.params.id as string,userId as string)
      
      if(organizer)res.status(HttpStatus.OK).json({data:{success,auction,organizer}})
      else if(!organizer) res.status(HttpStatus.OK).json({data:{success,auction,organizer}})
      else res.status(HttpStatus.FORBIDDEN).json({message,success})
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE +(error as Error).message})
    }
  }
  async raiseBid_AMT(req:AuthRequest,res:Response){
    try {
      const userId = req.user
      const {amt,auctionId}= req.body
      const {message,success} = await this.auctionService.raiseBidAMT(amt,auctionId,userId as string)
      if(success){
        // this.socketService.emitToRoom(auctionId, "bidUpdated", { amt, userId });
        res.status(HttpStatus.OK).json({message,success})}
        else res.status(HttpStatus.BAD_REQUEST).json({message,success})
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE+(error as Error).message})

    }
  }
  async accept_BidAmt(req:AuthRequest,res:Response){
    try {
      const {userid,amt,auctionId}= req.body      
      const  {message,success}=await this.auctionService.acceptBidAmt(userid,amt,auctionId)      
      if(success){
        // this.socketService.emitToRoom(auctionId, "bidAccepted", { userid, amt });
        res.status(HttpStatus.OK).json({message,success})}
        else res.status(HttpStatus.UNAUTHORIZED).json({message,success})
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.INTERNAL_ERROR +(error as Error).message})

    }
  }
  async filtered_auction(req:Request,res:Response){
    try {
      
     const {success,category,data,message} = await this.auctionService.filterd_Auctions(req.query)
     if(success)res.status(HttpStatus.OK).json({data:{data,category}})
      else res.status(HttpStatus.UNAUTHORIZED).json({success,message})
    } catch (error) {
      
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE +(error as Error).message})
    }
  }
  async listByType(req:Request,res:Response){
    try {
      const auction = req.params.type      
      const {success, data, message}=await this.auctionService.listBy_Type(auction)
      if(success) res.status(HttpStatus.OK).json({success,data})
        else res.status(HttpStatus.NOT_FOUND).json({message,success})
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE +(error as Error).message})
    }
  }
 
} 
export const auctionController = Container.get(AuctionController);
