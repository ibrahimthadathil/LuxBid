import { IBaseRepository } from "../interface/base_Interface";
import { Model, Document} from "mongoose";
import { Service } from "typedi";

@Service()
export abstract class BasRepository <T extends Document>implements IBaseRepository<T>{

    private model : Model<T>

    constructor(model : Model<T>){
        this.model  = model
    }

    async findAll(): Promise<T[]> {
        return this.model.find({},'-password')
    }

    async create(data: Partial<T>): Promise<T> {

        return this.model.create(data)
    }
    
    async findById(id: string): Promise<T | null> {
        return this.model.findById(id)
    }
    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id,data,{new:true})     
    }

    async delete(id: string): Promise<void> {
        this.model.findByIdAndDelete(id)
    }
}