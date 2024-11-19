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
            return await Category.findOne({name})
        } catch (error) {
            throw new Error('Failed to find')
        }
    }
}