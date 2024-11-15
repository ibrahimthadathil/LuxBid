import { Service } from "typedi";
import { ISeller, Organizer } from "../../models/organizerModel";
import { BasRepository } from "./baseRepository";

@Service()
export class organizerRepository extends BasRepository<ISeller>{

    constructor(){
        super(Organizer)
    }


}