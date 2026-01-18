
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security, NoSecurity, Patch} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators.js";
import e, { Request as ExpressRequest,Response as ExpressResponse } from "express";

import { TYPES } from "../types/binding.type.js";
import { CategoryServiceInterface } from "../interfaces/category-service.interface.js";
import { CategoryControllerInterface } from "../interfaces/category-controller.interface.js";
import { Category } from "../entities/category.entity.js";



@Route("categories")
@Tags("Category")
@Controller() 
export class CategoryController extends BaseController implements CategoryControllerInterface {

  @AutoWired(TYPES.CategoryServiceInterface)
  private readonly categoryService!: CategoryServiceInterface;
    
  @Get("/")
  async getAllCategories(): Promise<Category[] | Error> {
    try {
      return await this.categoryService.getAllCategories();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching all categories:", error.message);
        return error;
      } else {
        console.error("unknown error fetching all categories:", error);
        return new Error("Unknown error fetching all categories");
      }
    }     
  }
  @Get("/{id}")
  async getCategoryById(@Path() id: number): Promise<Category | null | Error> {
    try {
      return await this.categoryService.getCategoryById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error fetching category with ID ${id}:`, error.message);
        return new Error(`Error fetching category with ID ${id}: ${JSON.stringify(error)}`);
      } else {
        console.error(`unknown error fetching category with ID ${id}:`, error);
        return new Error(`Unknown error fetching category with ID ${id}: ${JSON.stringify(error)}`);
      }
    }
  }

  
  @Post("/")
  async createCategory(@Body() name: any): Promise<Category | Error> {
    try {
      return await this.categoryService.createCategory(name);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error("Error creating category: " + JSON.stringify(error.message));
      } 
        console.error("unknown error creating category:", error);
        return new Error("Unknown error creating category: " + JSON.stringify(error));
    }
  }

  @Patch("/{id}")
  async updateCategory(@Path() id: number, @Body() name: any): Promise<Category | null | Error> {
    try {
      return await this.categoryService.updateCategory(id, name);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error updating category with ID ${id}:`, error.message);
        return new Error(`Error updating category with ID ${id}: ${JSON.stringify(error.message)}`);
      }
      return new Error(`Unknown error updating category with ID ${id}: ${JSON.stringify(error)  }`);
    }
  }
  @Delete("/{id}")
  async deleteCategory(@Path() id: number): Promise<boolean | Error> {
    try {
      return await this.categoryService.deleteCategory(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error deleting category with ID ${id}:`, error.message);
        return new Error(`Error deleting category with ID ${id}: ${JSON.stringify(error.message)}`);
      }
      return new Error(`Unknown error deleting category with ID ${id}: ${JSON.stringify(error)}`);
    }
  }
    
}

