import { Admin, Iadmin } from "../../../models/admin/adminModal";
import { BasRepository } from "../basre_repository";


class adminRepository extends BasRepository<Iadmin>{
    constructor(){
        super(Admin)
    }
}

export const admin_Repo = new adminRepository()