import { Icategory } from "../../models/categoryModel"


export interface IcategoryService{
    add_Category(name:string,status:boolean):Promise<{success:boolean,message:string}>;
    get_Category():Promise<{success:boolean,message?:string,data?:Icategory[]}>;
    find_Category(name:string):Promise<{success:boolean,data:Icategory}>;
    remove_Category(id:string):Promise<{success:boolean,message?:string}>;
    category_Update(id:string):Promise<{success:boolean,message?:string}>
}