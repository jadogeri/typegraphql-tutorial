import { Category } from "../entities/category.entity";

export interface CategoryRepositoryInterface {
    getAll(): Promise<Category[]>;
    getOne(id: number): Promise<Category | null>;
    create(name: string): Promise<Category>;
    update(id: number, name: string): Promise<Category | null>;
    delete(id: number): Promise<boolean>;
}