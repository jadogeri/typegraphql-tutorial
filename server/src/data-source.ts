import { DataSource } from "typeorm";
import { Region } from "./entities/region.entity";
import { Category } from "./entities/category.entity";
import { PaymentMethod } from "./entities/payment-method.entity";
import { PaymentStatus } from "./entities/payment-status.entity";

export const AppDataSource = new DataSource({
    type: "better-sqlite3", // or "mysql", "sqlite", etc.
    database: process.env.DB_DATABASE || "userDB.sqlite",
    synchronize: true, // Use carefully in production
    logging: false,
    entities: [Region, Category, PaymentMethod, PaymentStatus], // List your entities here
    migrations: [],
    subscribers: [],
});

  export async function connect(): Promise<void> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("🛢️  Database connected and DataSource bound.");
    }
  }
