import  { Router } from 'express'
import { AuthMiddleWare } from '@/middleware/user/AuthMiddleware';
import { userController } from '@/controller/implements/user/userController';
import { buyer_controller } from '@/controller/implements/user/buyerController';
import { Organizer_Controller } from '@/controller/implements/user/organizerController';
import { upload } from '@/utils/multer_Utils';
import { authorizationAccess } from '@/middleware/user/AuthorizationMiddleware';

const userRoute = Router()

userRoute.get('/user',AuthMiddleWare,authorizationAccess,userController.find_User.bind(userController))
userRoute.post('/setbuyer',AuthMiddleWare,buyer_controller.set_Buyer.bind(buyer_controller))
userRoute.post('/setseller',AuthMiddleWare,Organizer_Controller.set_Organizer.bind(Organizer_Controller))
userRoute.get('/buyer',AuthMiddleWare,buyer_controller.get_Buyer.bind(buyer_controller))
userRoute.get('/seller',AuthMiddleWare,Organizer_Controller.get_Organizer.bind(Organizer_Controller))
userRoute.post('/uploadprofile',AuthMiddleWare,upload.single('image'),userController.upload_Profile.bind(userController))
userRoute.post('/editprofile',AuthMiddleWare,userController.edit_Profile.bind(userController))
userRoute.get('/allBids',AuthMiddleWare,buyer_controller.committed_Auction.bind(buyer_controller))

// stripe route 
userRoute.post('/create-checkout-session',AuthMiddleWare,userController.make_Payment.bind(userController))
userRoute.get('/session-status',AuthMiddleWare,userController.payment_Status.bind(userController)) 




export default userRoute

