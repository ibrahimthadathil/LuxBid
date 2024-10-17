import { Request, Response } from "express";
import { userService } from "../../service/userService";
import { Iuser } from "../../models/userModel";


class UserController{

    async Signup( req:Request , res:Response ){
        try {
            
            const userData : Iuser = req.body
            await userService.createUser(userData)
            


           } catch (error) {
            console.log((error as Error).message);
            
           }
         }

}

export const userController = new UserController()

