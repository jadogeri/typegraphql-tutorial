
import { Request, Controller as BaseController, Body, Delete, Get, Post, Put, Route, Tags, Response, Path, Example, SuccessResponse, Res, TsoaResponse, Security, NoSecurity, Patch} from "tsoa";
import { AutoWired, Controller, Middleware } from "../decorators.js";
import { Request as ExpressRequest,Response as ExpressResponse } from "express";

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
  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryService.getAllCategories();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching all categories:", error.message);
      } else {
        console.error("unknown error fetching all categories:", error);
      }
      throw error;
    }     
  }
  @Get("/{id}")
  async getCategoryById(@Path() id: number): Promise<Category | null> {
    try {
      return await this.categoryService.getCategoryById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error fetching category with ID ${id}:`, error.message);
      } else {
        console.error(`unknown error fetching category with ID ${id}:`, error);
      }
      throw error;
    }
  }

  
  @Post("/")
  async createCategory(@Body() name: any): Promise<Category> {
    try {
      return await this.categoryService.createCategory(name);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating category:", error.message);
      } else {
        console.error("unknown error creating category:", error);
      }
      throw error;
    }
  }

  @Patch("/{id}")
  async updateCategory(@Path() id: number, @Body() name: any): Promise<Category | null> {
    try {
      return await this.categoryService.updateCategory(id, name);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error updating category with ID ${id}:`, error.message);
      } else {
        console.error(`unknown error updating category with ID ${id}:`, error);
      } 
      throw error;
    }
  }
  @Delete("/{id}")
  async deleteCategory(@Path() id: number): Promise<boolean> {
    try {
      return await this.categoryService.deleteCategory(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error deleting category with ID ${id}:`, error.message);
      } else {
        console.error(`unknown error deleting category with ID ${id}:`, error);
      }
      throw error;
    }
  }
    
}

