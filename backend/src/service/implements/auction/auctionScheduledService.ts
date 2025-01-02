import { agenda } from "@/config/agendaConfig";
import { auctionRepository } from "@/repositories/implimentation/auction/auctionRepository";
import { logError } from "@/utils/logger_utils";
import { Service } from "typedi";
@Service()
export class scheduledAuctionService {

  constructor(private auctionRepo: auctionRepository) {
    agenda.define('close auction',async(job:any)=>{
        try {
            const { auctionId } = job.attrs.data;
            await this.auctionRepo.update(auctionId,{isActive:false})
        } catch (error) {
            logError('error in close auction')
        }
        
    })
  }

  async scheduleAuctionClosure(auctionId: string, endTime: Date) {
    try {

        await agenda.schedule(endTime, "close auction", { auctionId });
        console.log(`Scheduled auction will end on time`);
    } catch (error) {
        logError(`${(error as Error).message}`)
    }
  }
  
}
