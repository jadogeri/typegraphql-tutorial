// src/ioc.config.ts
import { Container, decorate, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { Controller } from 'tsoa';
import { buildProviderModule } from "inversify-binding-decorators";
import { TYPES } from '../types/binding.type';
import { CategoryControllerInterface } from '../interfaces/category-controller.interface';
import { CategoryServiceInterface } from '../interfaces/category-service.interface';
import { CategoryRepositoryInterface } from '../interfaces/category-repository.interface';
import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';
import { CategoryRepository } from '../repositories/category.repository';

    // import { DatabaseServiceInterface } from '../interfaces/database-service.interface';
    // import { SQLiteService } from '../services/sqlite.service';



const iocContainer = new Container();

decorate(injectable(), Controller); 
iocContainer.load(buildProviderModule());

  //  0. bind controllers
  
    iocContainer.bind<CategoryControllerInterface>(CategoryController).toSelf();

    // 1. Bind the service that manages the connection
    // iocContainer.bind<SQLiteService>(SQLiteService).toSelf().inSingletonScope();
    // iocContainer.bind<DatabaseServiceInterface>(TYPES.DatabaseServiceInterface).to(SQLiteService).inSingletonScope();
    iocContainer.bind<CategoryServiceInterface>(TYPES.CategoryServiceInterface).to(CategoryService).inSingletonScope();


    // 2. Bind the Repository (it will wait for TYPES.DataSource to be available)
    iocContainer.bind<CategoryRepositoryInterface>(TYPES.CategoryRepositoryInterface).to(CategoryRepository).inSingletonScope();


// 3. Helper to bind the live DataSource after connection
/**
 * Binds a given DataSource instance to the IoC container as a constant value.
 * This allows for dependency injection of the DataSource throughout the application.
 * 
 * @param {DataSource} dataSource - The DataSource instance to be bound.
 * @returns {void}
 * @throws {Error} Throws an error if the binding fails.
 */


export const bindDataSource =(dataSource: DataSource) => {
  if (iocContainer.isBound(TYPES.DataSource)) {
    return iocContainer.unbind(TYPES.DataSource)
  }
  return iocContainer.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
};


export { iocContainer };




