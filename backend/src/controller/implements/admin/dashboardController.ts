import { HttpStatus } from "@/enums/http_StatusCode";
import { adminDashboardService } from "@/service/implements/admin/adminDashboardService";
import { logError } from "@/utils/logger_utils";
import { Request, Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class DasboardController{
    constructor(
        private adminDashboardService : adminDashboardService
    ){}
async dashboard(req:Request,res:Response){
    try { 
      const {success,...rest}=  await this.adminDashboardService.dashboardDatas();
      if(success) res.status(HttpStatus.OK).json({data:rest})
      else res.status(HttpStatus.NOT_FOUND) 
    } catch (error) {
      logError(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

export const dashboardController = Container.get(DasboardController)