import { Service } from "typedi";
import { productRepository } from "../../../repositories/implimentation/productsRepository";
import { s3Service } from "../user/uploadService";
import { Iuser } from "../../../models/userModel";
import { Iproduct } from "../../../models/productModel";
import { categoryService } from "../admin/category_Service";

@Service()
export class productService{
    constructor(
        private productrepo :productRepository,
        private s3Service : s3Service,
        private categoryService :categoryService
    ){}

    async createPost(user:Iuser,data:Partial<Iproduct>,files:Express.Multer.File[]){
        try {
            const category =await this.categoryService.findCategory(data.category as string)
            if(category){
             const response= await this.s3Service.upload_File(files,'product')
             console.log('wwwwwwww');
             if(Array.isArray(response)){
                 console.log('dddddddd');
                const imagesLink = response.map((file)=>file.Location)
                data.category = category._id
                const post ={...data,images:imagesLink,seller:user._id} as Iproduct                
                const setPost = await this.productrepo.create(post)
                console.log('$$$$$$$$$',setPost);
                if(setPost)return {success:true,message:'Post created Successfully'}
                else return {success:false,message:'Failed to create'}
            }else throw new Error('Server Error , Try later') 
         } else throw new Error('failed for setup') 
                        
        } catch (error){
            console.log('from create post error');
            return {success:false,message:(error as Error).message}
        }
    }
    async getPost(userId:string){
        try {
           const res = await this.productrepo.findByUser(userId)
           if(res){
            return {success:true , data :res}
           }else throw new Error('Failed to fetch')
        } catch (error) {
            return{success:false,message:(error as Error).message}
        }
    }
}