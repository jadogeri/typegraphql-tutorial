import { DataSource } from "typeorm";

/**
 * Initializes the given DataSource if it is not already initialized.
 * Logs a message upon successful connection to the database.
 * 
 * @param dataSource - The DataSource instance to connect.
 * @returns A promise that resolves when the connection is established.
 * @throws Error if the initialization fails.
 */
  export async function connect(dataSource: DataSource): Promise<void> {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log("🛢️  Database connected and DataSource bound.");
    }
  }

  