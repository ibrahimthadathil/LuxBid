import { Service } from "typedi";
import { productRepository } from "../../../repositories/implimentation/productsRepository";
import { s3Service } from "../user/uploadService";
import { Iuser } from "../../../models/userModel";
import { Iproduct } from "../../../models/productModel";
import { categoryService } from "../admin/category_Service";
import { response } from "express";
import { IproductService } from "../../interface/productService_Interface";

@Service()
export class productService implements IproductService{
    constructor(
        private productrepo :productRepository,
        private s3Service : s3Service,
        private categoryService :categoryService
    ){}

    async create_Post(user:Iuser,datas:Partial<Iproduct>,files:Express.Multer.File[]){
        try {
            const {data} =await this.categoryService.find_Category(datas.category as string)
            if(data){
             const response= await this.s3Service.upload_File(files,'product')
             console.log('wwwwwwww');
             if(Array.isArray(response)){
                 console.log('dddddddd');
                const imagesLink = response.map((file)=>file.Location)
                datas.category = data._id
                const post ={...datas,images:imagesLink,seller:user._id} as Iproduct                
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
    async findUser_Post(userId:string){
        try {
           const res = await this.productrepo.findByUser(userId)
           if(res){
            return {success:true , data :res}
           }else throw new Error('Failed to fetch')
        } catch (error) {
            return{success:false,message:(error as Error).message}
        }
    }

    async findAll_Products(status:boolean){
        try {                        
          const response= await this.productrepo.findByStatus(status)
          if(response)return {success:true,data:response}
          else throw new Error('Failed to fetch')  
        } catch (error) {
            return{success:false,message:(error as Error).message}

        }
    }
    async remove_Post(id:string){
        
    }
    async update_Post(id:string){
        try {
           const response = await this.productrepo.update(id,{status:'Approved',isApproved:true})
           if(response) return {success:true,message:'Post Approved'}
           else  throw new Error('Failed to Approve')
        } catch (error) {
            return{success:false,message:(error as Error).message}
        }
    }
    async reject_Post(id:string){
        try {
           const respondse = await this.productrepo.update(id,{status:'Rejected',isApproved:false})
           if(response){
            return {success:true ,message:'Post Rejected'}
           }else throw new Error('Failed to Reject')
        } catch (error) {
            return{success:false,message:(error as Error).message}
        }
    }
}