import  { Router } from 'express'
import { AuthMiddleWare } from '@/middleware/user/AuthMiddleware';
import { userController } from '@/controller/implements/user/userController';
import { buyer_controller } from '@/controller/implements/user/buyerController';
import { Organizer_Controller } from '@/controller/implements/user/organizerController';
import { upload } from '@/utils/multer_Utils';
import { authorizationAccess } from '@/middleware/user/AuthorizationMiddleware';
import { buyerAuthMiddleware } from '@/middleware/user/BuyerAuthMiddleware';
import { OrganizerAuthMiddleware } from '@/middleware/user/organizerAuthmiddleware';

const userRoute = Router()

userRoute.get('/user',AuthMiddleWare,authorizationAccess,userController.find_User.bind(userController))
userRoute.post('/setbuyer',AuthMiddleWare,authorizationAccess,buyer_controller.set_Buyer.bind(buyer_controller))
userRoute.post('/setseller',AuthMiddleWare,authorizationAccess,Organizer_Controller.set_Organizer.bind(Organizer_Controller))
userRoute.get('/buyer',AuthMiddleWare,authorizationAccess,buyerAuthMiddleware,buyer_controller.get_Buyer.bind(buyer_controller))
userRoute.get('/seller',AuthMiddleWare,authorizationAccess,OrganizerAuthMiddleware,Organizer_Controller.get_Organizer.bind(Organizer_Controller))
userRoute.post('/uploadprofile',AuthMiddleWare,authorizationAccess,upload.single('image'),userController.upload_Profile.bind(userController))
userRoute.post('/editprofile',AuthMiddleWare,authorizationAccess,userController.edit_Profile.bind(userController))
userRoute.get('/allBids',AuthMiddleWare,authorizationAccess,buyerAuthMiddleware,buyer_controller.committed_Auction.bind(buyer_controller))

// stripe route 
userRoute.post('/create-checkout-session',AuthMiddleWare,userController.make_Payment.bind(userController))
userRoute.get('/session-status',AuthMiddleWare,userController.payment_Status.bind(userController)) 

// userRoute.post('/webhook', 
//     // express.raw({type: 'application/json'}),
//     userController.webhook_Handler.bind(userController)
//   );



export default userRoute

