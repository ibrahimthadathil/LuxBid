import { Service } from "typedi";
import { productRepository } from "../../../repositories/implimentation/product/productsRepository"
import { s3Service } from "../user/uploadService";
import { Iuser } from "../../../models/userModel";
import { Iproduct } from "../../../models/productModel";
import { categoryService } from "../admin/category_Service";
import { response } from "express";
import { IproductService } from "../../interface/productService_Interface";
import { Icategory } from "../../../models/categoryModel";
import { title } from "process";

@Service()
export class productService implements IproductService{
    constructor(
        private productrepo :productRepository,
        private s3Service : s3Service,
        private categoryService :categoryService
    ){}

    async create_Post(user:string,datas:Partial<Iproduct>,files:Express.Multer.File[]){
        try {
            const {data} =await this.categoryService.find_Category(datas.category as string)
            if(data){
             const response= await this.s3Service.upload_File(files,'product')
             console.log('wwwwwwww');
             if(Array.isArray(response)){
                 console.log('dddddddd');
                const imagesLink = response.map((file)=>file.Location)
                datas.category = data._id
                const post ={...datas,images:imagesLink,seller:user} as Iproduct                
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
        try {
        const post = await this.productrepo.findById(id)        
        const imagesLink = post?.images || []
        const response = await this.s3Service.delete_File(imagesLink)
        if(response){
            const response = await this.productrepo.delete(id)  
            if(response) return {success:true,message:'Delete successfully'}
            else throw new Error('failed to delete from the DB')
        }   
        else throw new Error('failed to delete')
        } catch (error) {
            return{success:false,message:(error as Error).message}
        }
    }
    async update_PostStatus(id:string){
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
    async update_post(id:string,data:Partial<any|Iproduct>,img?:Express.Multer.File[]){
       try {
        const findCategory = await this.categoryService.find_Category(data.category as string)
        const existingImg = data.preImg ? data.preImg.split(','): []   
        if(img?.length){
            const response= await this.s3Service.upload_File(img,'product')
            if(Array.isArray(response))response.map((link)=>existingImg.push(link.Location))
            else throw new Error('Failed to upload Image, Try later')
        }
            const updatedPost={title:data.title,category:findCategory.data._id,images:existingImg,description:data.description}
            const response = await this.productrepo.update(id,updatedPost)
            if(response) return {success:true,message:'Post updated'}
            else throw new Error('failed to update')
       } catch (error) {
            console.log('0000',(error as Error).message);
            return {success:false,message:(error as Error).message}
       }
        
        
    }
    async approved_Post(userId:string){
        try {
           const approvedPost= await this.productrepo.findByApproved(userId)
           console.log('approved',approvedPost);
           
           if(approvedPost)return {success:true,data:approvedPost}
           else throw new Error('Failed to fetch post')
           
        } catch (error) {
            console.log('approved post',(error as Error).message);
            return {success:false,message:(error as Error).message}
        }
    }
}