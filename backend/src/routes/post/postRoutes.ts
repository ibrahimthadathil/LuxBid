import {Router} from 'express'
import { AuthMiddleWare } from '@/middleware/user/AuthMiddleware'
import { categoryController } from '@/controller/implements/admin/categoryController'
import { upload } from '@/utils/multer_Utils'
import { productController } from '@/controller/implements/product/productController'

const postRoute = Router()
// find Category
postRoute.get('/findcategory',categoryController.get_ListedCategory.bind(categoryController))
//post
postRoute.post('/addpost',AuthMiddleWare,upload.array('images',5),productController.create_Post.bind(productController))
postRoute.get('/getpost',productController.get_Post.bind(productController))
postRoute.put('/updatepost/:id',upload.array('images',5),productController.update_Post.bind(productController))
postRoute.delete('/removepost/:id',productController.remove_Post.bind(productController))
postRoute.get('/approvedpost',productController.approved_Post.bind(productController))

export default postRoute