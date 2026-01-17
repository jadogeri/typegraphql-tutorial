import { DataSource, Repository as BaseRepository } from "typeorm";
import { Repository } from "../decorators.js";
import { inject } from "inversify";
import { TYPES } from "../types/binding.type.js";
import { Category } from "../entities/category.entity.js";
import { CategoryRepositoryInterface } from "../interfaces/category-repository.interface.js";

    
@Repository()
export class CategoryRepository extends BaseRepository<Category> implements CategoryRepositoryInterface {
    

    constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
        //console.log("Registered Entities:", dataSource.entityMetadatas.map(m => m.name));
        super(Category, dataSource.createEntityManager());
        
    }
    getAll(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
    getOne(id: number): Promise<Category | null> {
        throw new Error("Method not implemented.");
    }
    getCategory(): any {
        return {message: "Get category endpoint from repository" };
    }
    createCategory  (): any {
        return {message: "Create category endpoint from repository" };
    }
    updateCategory(): any {
        return {message: "Update category endpoint from repository" };
    }
    replaceCategory(): any {
        return {message: "Replace category endpoint from repository" };
    }
    deleteCategory(): any {
        return {message: "Delete category endpoint from repository" };
    }  
    
}

