import Container, { Service } from "typedi";
import { userService } from "../../../service/implements/user/userService";
import { IuserContrller } from "../../interface/controller_Interface";
import { Request, Response } from "express";
import { AuthRequest } from "../../../types/api";

@Service()
 class user_Controller implements IuserContrller{

    constructor(
        private userServide : userService

    ){}

    async findUser (req:AuthRequest , res:Response){
        try {
            const user = req.user
            if(user){
                res.status(200).json({ success:true , data :user})
            }else res.status(401).json({success:false , message:'un-Authorized'})
            
        } catch (error) {
            console.log('from error',(error as Error).message);
            res.status(500).json({message:'Internal Error'})
        }
    }


}

export const userController = Container.get(user_Controller)

