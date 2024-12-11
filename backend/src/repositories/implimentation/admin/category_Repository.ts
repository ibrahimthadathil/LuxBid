import { Service } from "typedi";
import { BasRepository } from "../baseRepository";
import { Category, Icategory } from "../../../models/categoryModel";


@Service()
export class categoryRepository extends BasRepository<Icategory>{

    constructor(){
        super(Category)
    }
    async findByName(name:string){
        try {
            return await Category.findOne({name: { $regex: new RegExp("^" + name + "$", "i") },}
        )
        } catch (error) {
            throw new Error('Failed to find')
        }
    }
    async listAndUnlist(id:string){
        try {
            const category =await this.findById(id) as Icategory
            return await Category.findByIdAndUpdate(id,{isActive:!category.isActive})
        } catch (error) {
            throw new Error('Failed to update category')
        }
    }
    async findByListed(){
        try {
            return await Category.find({isActive:true})
        } catch (error) {
            throw new Error('Failed to find')

        }
    }
}