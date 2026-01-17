import { Repository } from "typeorm";
import { Category } from "../entities/category.entity.js";

export interface CustomCategoryRepositoryInterface {
    getAll(): Promise<Category[]>;
    getOne(id: number): Promise<Category | null>;
}



export interface CategoryRepositoryInterface extends Repository<Category>, CustomCategoryRepositoryInterface {};