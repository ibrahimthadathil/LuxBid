import { Service } from "typedi";
import { categoryRepository } from "../../../repositories/implimentation/admin/category_Repository";


@Service()
export class categoryService {
    constructor(
        private cateRepo:categoryRepository
    ){}

    async addCategory(name:string , status:boolean){
        try {
            const exist = await this.cateRepo.findByName(name)
            if(exist) return { success:false , message:'Already exist'}
          const response = await this.cateRepo.create({name,isActive:status})
          if(response) return {success:true , message:'Created succesfully'}
          else throw new Error('Failed to Add category')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
    async getCategory(){
        try {
            const response = await this.cateRepo.findAll()            
            if(response)return {success:true ,data:response}
            else throw new Error('failed to fetch')
        } catch (error) {
            return {success:false,message:(error as Error).message}
        }
    }
    async findCategory(name:string){
        try {
           return await this.cateRepo.findByName(name)
        } catch (error) {
           throw new Error('error from finding category') 
        }
    }
    async removeCategory(id:string){
        
        try {
           const response = await this.cateRepo.delete(id)
            if(response)return {success:true,message:'Deleted succesfully'}
            else throw new Error('failed to delete')
        } catch (error) {
            throw new Error('Error from category Deletion')
        }
    }
    async categoryUpdate(id:string){
        try {
          const response = await this.cateRepo.listAndUnlist(id)
          if(response)return {success:true,message:response.isActive ? 'Item Blocked':'Item listed'}
          else return {success:false , message:'failed to update'}
        } catch (error) {
            return {success:false , message:'Internal Error, Try Later'}
        }
    }
}