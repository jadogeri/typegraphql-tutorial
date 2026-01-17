import { DataSource } from "typeorm";
import { DatabaseServiceInterface } from "../interfaces/database-service.interface.js";
import { Service } from "../decorators.js";
import { AppDataSource } from "../configs/typeOrm.config.js";

@Service()
export class SQLiteService implements DatabaseServiceInterface{
  
  private readonly dataSource: DataSource;
    
  constructor() {
    this.dataSource = AppDataSource
  }
  
  public async connect(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      console.log("🛢️ SQLite3 Database connected and DataSource bound.");
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}

export default new SQLiteService().getDataSource();