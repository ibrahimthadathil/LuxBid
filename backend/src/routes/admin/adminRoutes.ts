import {Router} from "express";
import { adminController } from "../../controller/admin/adminController";


const adminRoute = Router() 

adminRoute.post('/auth/signin',adminController.adminSignIn.bind(adminController))


export default adminRoute