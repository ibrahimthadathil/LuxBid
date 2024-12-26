import {Router} from 'express'
import { AuthMiddleWare } from '@/middleware/user/AuthMiddleware'
import { category_Controller } from '@/controller/implements/admin/categoryController'
import { upload } from '@/utils/multer_Utils'
import { product_Controller } from '@/controller/implements/product/productController'
import { authorizationAccess } from '@/middleware/user/AuthorizationMiddleware'
import { OrganizerAuthMiddleware } from '@/middleware/user/organizerAuthmiddleware'

const postRoute = Router()
// find Category
postRoute.get('/findcategory',category_Controller.get_ListedCategory.bind(category_Controller))
//post
postRoute.post('/',upload.array('images',5),product_Controller.create_Post.bind(product_Controller))
postRoute.get('/getpost',product_Controller.get_Post.bind(product_Controller))
postRoute.put('/updatepost/:id',upload.array('images',5),product_Controller.update_Post.bind(product_Controller))
postRoute.delete('/removepost/:id',product_Controller.remove_Post.bind(product_Controller))
postRoute.get('/approvedpost',product_Controller.approved_Post.bind(product_Controller))

export default postRoute