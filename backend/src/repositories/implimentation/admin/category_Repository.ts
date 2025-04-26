import { Service } from "typedi";
import { BasRepository } from "../baseRepository";
import { Category, Icategory } from "../../../models/categoryModel";
import  { logError } from "@/utils/logger_utils";


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
            logError(error)
            throw new Error('Failed to find')
        }
    }
    async listAndUnlist(id:string){
        try {
            const category =await this.findById(id) as Icategory
            return await Category.findByIdAndUpdate(id,{isActive:!category.isActive})
        } catch (error) {
            logError(error)
            throw new Error('Failed to update category')
        }
    }
    async findByListed(){
        try {
            return await Category.find({isActive:true})
        } catch (error) {
            logError(error)
            throw new Error('Failed to find')

        }
    }
    async findAllCategoryByField(){
        try {
            return await Category.find({isActive:true},{_id:0,name:1})
        } catch (error) {
            logError(error)
            throw new Error('From find  category')
        }
    }
    async fetchgroup(){
        try {
            return await Category.aggregate([{$match:{isActive:true}},{
                $lookup:{
                    from:'messages',
                    localField:'_id',
                    foreignField:'category',
                    as:'messages'
                }},
                {
                    $addFields:{recentMessage:{$arrayElemAt:['$messages',0]}}
                },
                {
                    $project:{name:1,recentMessage:1}
                }
            ])
       
        } catch (error) {
            console.log('error from meeeee');
            logError(error)
        }
    }
}