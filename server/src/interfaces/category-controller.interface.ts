import { Category } from "../entities/category.entity.js";

export interface CategoryControllerInterface {
    getAllCategories(): Promise<Category[] | Error>;
    getCategoryById(id: number): Promise<Category | null | Error>;
    createCategory(name: string): Promise<Category | Error>;
    updateCategory(id: number, name: string): Promise<Category | null | Error>;
    deleteCategory(id: number): Promise<boolean | Error>;
}