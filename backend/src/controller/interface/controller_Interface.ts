import { Request, Response } from "express";
import { Iuser } from "../../models/userModel";
import { AuthRequest } from "../../types/api";


export interface Iusermangament{
    findAllUsers(role:string):Promise<{success:boolean , data:Iuser[]}>
    update_user(email:string):Promise<{ success:boolean , message :string}>
}





