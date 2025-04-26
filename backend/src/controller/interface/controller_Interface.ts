import { Iuser } from "../../models/userModel";


export interface Iusermangament{
    findAllUsers(role:string):Promise<{success:boolean , data:Iuser[]}>
    update_user(email:string):Promise<{ success:boolean , message :string}>
}





