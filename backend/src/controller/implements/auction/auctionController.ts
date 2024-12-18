import Container, { Service } from "typedi";
import { auctionService } from "../../../service/implements/auction/auctionService";
import { AuthRequest } from "../../../types/api";
import { Request, Response } from "express";
import { IAuction } from "../../../models/auctionModel";

@Service()
export class auctionController {
  constructor(private auctionService: auctionService) {}
  
  async create_Auction(req:AuthRequest,res:Response){
    const organizer = req.user 
    const auction = req.body as IAuction
    try {
    if(organizer){      
     const {message,success} = await this.auctionService.create_Auction(auction,organizer._id as string)
     if(success)res.status(200).json({message,success})
      else res.status(401).json({message,success})
    }else throw new Error('Invalid access,')  
    } catch (error) {
      res.status(500).json({message:'Internal error, Try Later'})
    }  
  }
  async get_Auctions(req:AuthRequest,res:Response){
    try {
      const organizer = req.user
      if(organizer){
       const {success,data,message}= await this.auctionService.getUserAll_Auction(organizer._id as string)
       if(success)res.status(200).json({success,data})
        else res.status(401).json({success,message})
      }
    } catch (error) {
      res.status(500)
    }
  }
  async close_Auction(req:AuthRequest,res:Response){

    try {
      const organizer = req.user 
      const auctionId = req.params.id
      if(organizer){
       const {message,success}= await this.auctionService.close_Auction(auctionId)
       if(success)res.status(200).json({message,success})
        else res.status(401).json({message,success})
      }else res.status(403).json({message:'Accesss denied'})
    } catch (error) {
      res.status(500).json({message:'Intertnal server error'})
    }
  }
  async delete_Auction(req:AuthRequest,res:Response){
    try {
      const auctionId = req.params.id 
      if(auctionId){
       const {message,success} = await this.auctionService.delete_Auction(auctionId)
       if(success)res.status(200).json({success,message})
        else res.status(400).json({message,success})
      }else throw new Error('failed to match the Auction')
    } catch (error) {
      res.status(500).json({message:'Internal error'+(error as Error).message})
    }
  }
  async getTopAndDisplayAuctions(req:Request,res:Response){
    try {
      const {success,data,message} =await this.auctionService.getDisplay_Auctions()
      if(success)res.status(200).json({success,data})
        else res.status(400).json({success,message})
    } catch (error) {
      res.status(500).json({message:(error as Error).message})
    }
  }
  async view_Auction(req:AuthRequest,res:Response){
    try {
      const id = req.params.id
      const user = req.session.userId
      console.log('^^^^^^',user);
      
      if(id){
        const response= await this.auctionService.view_Auction(id,user as string)
        if(response?.success)res.status(200).json({data:response?.data,success:response?.success})
          else res.status(401).json({message:response?.message,success:response?.success})
      }else throw new Error('failed to view the post')
      
    } catch (error) {
      res.status(500).json({message:(error as Error).message})
    }
  }
  async auctoion_Interface(req:AuthRequest,res:Response){
    try {
      const user = req.user
      const {success,auction,message,organizer}=await this.auctionService.auction_Interface(req.params.id as string,user?._id as string)
      
      if(organizer)res.status(200).json({data:{success,auction,organizer}})
      else if(!organizer) res.status(200).json({data:{success,auction,organizer}})
      else res.status(403).json({message,success})
    } catch (error) {
      console.log('controller');
      res.status(500).json({message:'Internal Server Error :-'+(error as Error).message})
    }
  }
  async raiseBid_AMT(req:AuthRequest,res:Response){
    try {
      const user = req.user
      const {amt,auctionId}= req.body
      const g = await this.auctionService.raiseBidAMT(amt,auctionId,user?._id as string)
    } catch (error) {
      console.log('from update');
      
    }
  }
} 
export const auction_Controller = Container.get(auctionController);
