import { DataSource } from "typeorm";

// Function to connect and initialize the DataSource

  export async function connect(dataSource: DataSource): Promise<void> {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log("🛢️  Database connected and DataSource bound.");
    }
  }

  