import { HttpStatus } from "@/enums/http_StatusCode";
import { adminDashboardService } from "@/service/implements/admin/adminDashboardService";
import { Request, Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class DasboardController{
    constructor(
        private adminDashboardService : adminDashboardService
    ){}
async dashboard(req:Request,res:Response){
    try {
      const data=  await this.adminDashboardService.dashboardDatas();
    
    } catch (error) {
    }
  }
}

export const dashboardController = Container.get(DasboardController)