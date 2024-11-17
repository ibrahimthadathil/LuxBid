import  { Router } from 'express'
import { AuthMiddleWare } from '../../middleware/AuthMiddleware';
import { userController } from '../../controller/implements/user/userController';
import { buyer_controller } from '../../controller/implements/user/buyerController';
import { Organizer_Controller } from '../../controller/implements/user/organizerController';

const userRoute = Router()

userRoute.get('/user',AuthMiddleWare,userController.findUser.bind(userController))
userRoute.post('/setbuyer',AuthMiddleWare,buyer_controller.setBuyer.bind(buyer_controller))
userRoute.post('/setseller',AuthMiddleWare,Organizer_Controller.setOrganizer.bind(Organizer_Controller))
userRoute.get('/buyer',AuthMiddleWare,buyer_controller.getBuyer.bind(buyer_controller))

export default userRoute

