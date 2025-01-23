import { Service } from "typedi";
import { categoryRepository } from "../../../repositories/implimentation/admin/category_Repository";
import { IcategoryService } from "../../interface/categoryServices_Interface";
import { messageRepository } from "@/repositories/implimentation/chat/messageRepositury";


@Service()
export class categoryService implements IcategoryService{
    constructor(
        private cateRepo:categoryRepository,
        private chatRepo:messageRepository
    ){}

    async add_Category(name:string , status:boolean){
        try {
            const exist = await this.cateRepo.findByName(name)
            if(exist) return { success:false , message:'Already exist'}
          const response = await this.cateRepo.create({name,isActive:status})
          if(response) await this.chatRepo.create({category:response.id,user:'Admin',content: `Welcome to the ${name} group chat! Feel free to share your thoughts.`})
           else throw new Error('Group chat Execution failed') 
          if(response) return {success:true , message:'Created succesfully'}
          else throw new Error('Failed to Add category')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    async get_Category(){
        try {
            const response = await this.cateRepo.findAll()    
            if(response)return {success:true ,data:response}
            else throw new Error('failed to fetch')
        } catch (error) {
            return {success:false,message:(error as Error).message}
        }
    }
    async get_ListedCategory(){
        try {
            const response = await this.cateRepo.findByListed()      
            if(response)return {success:true ,data:response}
            else throw new Error('failed to fetch')
        } catch (error) {
            return {success:false,message:(error as Error).message}
        }
    }
    async find_Category(name:string){
        try {
           const response= await this.cateRepo.findByName(name)
           if(response) return {success:true,data:response}
           else throw new Error('failed to fetch category')
        } catch (error) {
           throw new Error('error from finding category') 
        }
    }
    async remove_Category(id:string){
        
        try {
           const response = await this.cateRepo.delete(id)
            if(response)return {success:true,message:'Deleted succesfully'}
            else throw new Error('failed to delete')
        } catch (error) {
            throw new Error('Error from category Deletion')
        }
    }
    async category_Update(id:string){
        try {
          const response = await this.cateRepo.listAndUnlist(id)
          if(response)return {success:true,message:response.isActive ? 'Item Blocked':'Item listed'}
          else return {success:false , message:'failed to update'}
        } catch (error) {
            return {success:false , message:'Internal Error, Try Later'}
        }
    }
}