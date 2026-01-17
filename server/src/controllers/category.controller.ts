
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security, NoSecurity} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators";
import { Request as ExpressRequest,Response as ExpressResponse, name } from "express";

import { TYPES } from "../types/binding.type";
import { CategoryServiceInterface } from "../interfaces/category-service.interface";
import { CategoryControllerInterface } from "../interfaces/category-controller.interface";
import { Category } from "../entities/category.entity";



@Route("categories")
@Tags("Category")
@Controller() 
export class CategoryController extends BaseController implements CategoryControllerInterface {

  @AutoWired(TYPES.CategoryServiceInterface)
  private readonly categoryService!: CategoryServiceInterface;
    
  @Get("/")
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
  @Get("/{id}")
  getCategoryById(id: number): Promise<Category | null> {
    return this.categoryService.getCategoryById(id);
  }

  @Post("/")
  createCategory(name: string): Promise<Category> {
    return this.categoryService.createCategory(name);
  }

  @Put("/{id}")
  updateCategory(id: number, name: string): Promise<Category | null> {
    return this.categoryService.updateCategory(id, name);
  }
  @Delete("/{id}")
  deleteCategory(id: number): Promise<boolean> {
    return this.categoryService.deleteCategory(id);
  }
    
}


