import {Router} from 'express'
import { AuthMiddleWare } from '../../middleware/AuthMiddleware'
import { category_Controller } from '../../controller/implements/admin/categoryController'
import { upload } from '../../utils/multer_Utils'
import { product_Controller } from '../../controller/implements/product/productController'

const postRoute = Router()
// find Category
postRoute.get('/findcategory',AuthMiddleWare,category_Controller.get_ListedCategory.bind(category_Controller))
//post
postRoute.post('/addpost',AuthMiddleWare,upload.array('images',5),product_Controller.create_Post.bind(product_Controller))
postRoute.get('/getpost',AuthMiddleWare,product_Controller.get_Post.bind(product_Controller))
postRoute.put('/updatepost/:id',AuthMiddleWare,upload.array('images',5),product_Controller.update_Post.bind(product_Controller))
postRoute.delete('/removepost/:id',AuthMiddleWare,product_Controller.remove_Post.bind(product_Controller))
postRoute.get('/approvedpost',AuthMiddleWare,product_Controller.approved_Post.bind(product_Controller))

export default postRoute