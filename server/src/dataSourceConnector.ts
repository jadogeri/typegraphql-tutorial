import { DataSource } from "typeorm";

  export async function connect(dataSource: DataSource): Promise<void> {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log("🛢️  Database connected and DataSource bound.");
    }
  }

  