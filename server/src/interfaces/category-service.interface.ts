import { Category } from "../entities/category.entity.js";

export interface CategoryServiceInterface {
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category | null>;
    createCategory(name: string): Promise<Category>;
    updateCategory(id: number, name: string): Promise<Category | null>;
    deleteCategory(id: number): Promise<boolean>;
}