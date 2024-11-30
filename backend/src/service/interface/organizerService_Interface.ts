import { IBuyer } from "../../models/buyerModel";
import { ISeller } from "../../models/organizerModel";



export interface IorgaizerService{
    set_Organizer(userId:string):Promise<{success:boolean,message:string}>,
    get_Seller(userId:string):Promise<{success:boolean,message?:string,buyer?:IBuyer,seller?:ISeller}>
}