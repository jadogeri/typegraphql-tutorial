/**
 * @author Joseph Adogeri
 * @version 1.0.0
 * @since 16-JAN-2026
 * @filename data-source.ts
 * @file DataSource configuration for TypeORM
 */
import { DataSource, DataSourceOptions } from "typeorm";
import { Region } from "../entities/region.entity.js";
import { Category } from "../entities/category.entity.js";
import { PaymentMethod } from "../entities/payment-method.entity.js";
import { PaymentStatus } from "../entities/payment-status.entity.js";
import { OrderStatus } from "../entities/order-status.entity.js";
import { Order } from "../entities/order.entity.js";
import { Invoice } from "../entities/invoice.entity.js";
import { SeederOptions } from "typeorm-extension";
import { NodeEnvironment } from "../types/node-environment.type.js";

const options: DataSourceOptions & SeederOptions = {
    type: process.env.NODE_ENV !== "production" ? "sqlite" : "better-sqlite3", // or "mysql", "sqlite", etc.
    driver: process.env.NODE_ENV === "!roduction" ? require("@libsql/sqlite3") : null,
    flags: process.env.NODE_ENV !== "production" ? 0x00000040 : undefined, // required for TypeORM with libsql
    database: process.env.NODE_ENV !== "test" || process.env.NODE_ENV === "staging"|| process.env.NODE_ENV === "development" ? 
      process.env.DEV_DATABASE_URL || "userDB.sqlite" :   
      process.env.TURSO_DATABASE_URL + "?authToken=" + process.env.TURSO_AUTH_TOKEN || process.env.PROD_DATABASE_URL ,
    synchronize: process.env.NODE_ENV === "production" ,
    logging: false,
    entities: [Region, Category, PaymentMethod, PaymentStatus, OrderStatus, Order, Invoice ], // List your entities here
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
  
}



const env : NodeEnvironment = process.env.NODE_ENV || 'development';
console.log(`Current Environment: ${env}`);

  
export const AppDataSource = new DataSource(options);
