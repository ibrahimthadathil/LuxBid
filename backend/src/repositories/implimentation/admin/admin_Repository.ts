import { Service } from "typedi";
import { Admin, Iadmin } from "../../../models/admin/adminModal";
import { BasRepository } from "../base_repository";

@Service()
export class adminRepository extends BasRepository<Iadmin>{
    constructor(){
        super(Admin)
    }

    async findByEmail(email:string){
        try {
            return await Admin.findOne({email})
        } catch (error) {
            console.log(error);
            throw new Error((error as Error).message)
            
        }
    }
        

}

