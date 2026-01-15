import { DataSource } from "typeorm";
import { Region } from "./entities/region.entity.js";
import { Category } from "./entities/category.entity.js";
import { PaymentMethod } from "./entities/payment-method.entity.js";
import { PaymentStatus } from "./entities/payment-status.entity.js";
import { OrderStatus } from "./entities/order-status.entity.js";
import { Order } from "./entities/order.entity.js";
import { Invoice } from "./entities/invoice.entity.js";

export const AppDataSource = new DataSource({
    type: "better-sqlite3", // or "mysql", "sqlite", etc.
    database: process.env.DB_DATABASE || "userDB.sqlite",
    synchronize: false, // Use carefully in production
    logging: false,
    entities: [Region, Category, PaymentMethod, PaymentStatus, OrderStatus, Order, Invoice ], // List your entities here
    migrations: [],
    subscribers: [],
});

  export async function connect(): Promise<void> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("🛢️  Database connected and DataSource bound.");
    }
  }
