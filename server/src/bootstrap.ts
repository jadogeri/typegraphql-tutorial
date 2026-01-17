import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { bindDataSource, iocContainer } from "./configs/ioc.config.js";
import { SQLiteService } from './services/sqlite.service.js';
import { DataSource } from "typeorm";
  

export const bootstrap = async () : Promise<void> => {
  try {
    // A. Resolve the service and connect
    const databaseService = iocContainer.get<SQLiteService>(SQLiteService);
    await databaseService.connect(); 

    const dataSource : DataSource= databaseService.getDataSource();
    console.log("DataSource initialized:", dataSource.isInitialized);              

    // B. Inject the live DataSource into the container
    // This allows Repositories to resolve TYPES.DataSource
    await bindDataSource(dataSource);

  } catch (error: any) {
    if (error instanceof Error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    } else {
        console.error("❌ unknown error:", error);
        process.exit(1);        
    }
  }

}


