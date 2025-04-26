import { agendaInstance } from "@/config/agendaConfig";
import { auctionRepository } from "@/repositories/implimentation/auction/auctionRepository";
import { logError } from "@/utils/logger_utils";
import { Job } from "agenda";
import { Service } from "typedi";

@Service()
export class scheduledAuctionService {

  constructor(private auctionRepo: auctionRepository) {
    agendaInstance.define('close auction',async(job:Job)=>{
        try {
            const { auctionId } = job.attrs.data;
            await this.auctionRepo.update(auctionId,{isActive:false})
        } catch (error) {
            logError('error in close auction ' + (error as Error).message)
        }
        
    })
  }

  async scheduleAuctionClosure(auctionId: string, endTime: Date) {
    try {

        await agendaInstance.schedule(endTime, "close auction", { auctionId });
        console.log(`Scheduled auction will end on time`);
    } catch (error) {
        logError(`${(error as Error).message}`)
    }
  }
  
}
