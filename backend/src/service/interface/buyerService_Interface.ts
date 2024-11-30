import { IBuyer } from "../../models/buyerModel";


export interface IBuyerService{
    set_Buyer(userId:string):Promise<{ success:boolean , message:string }>,
    get_Buyer(buyerID:string):Promise<{success:boolean,message?:string,data?:IBuyer}>
}
