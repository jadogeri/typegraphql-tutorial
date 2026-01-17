import { AutoWired, Service } from "../decorators.js";
import { CategoryRepositoryInterface } from "../interfaces/category-repository.interface.js";
import { CategoryServiceInterface } from "../interfaces/category-service.interface.js";
import { TYPES } from "../types/binding.type.js";


@Service()
export class CategoryService implements CategoryServiceInterface{

    @AutoWired(TYPES.CategoryRepositoryInterface)
    private readonly categoryRepository!:  CategoryRepositoryInterface;    

    async createCategory(name: string): Promise<any> {
        return await this.categoryRepository.find();
    }
    async getAllCategories(): Promise<any> {
        return await this.categoryRepository.find();
    }
    async updateCategory(id: number, name: string): Promise<any> {
        return await this.categoryRepository.find();
    }
    async getCategoryById(id: number): Promise<any> {
        return await this.categoryRepository.find();
    }
    async deleteCategory(id: number): Promise<any> {
        return await this.categoryRepository.find();
    }
}