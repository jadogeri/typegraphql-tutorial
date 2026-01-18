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
import { verbose } from "@libsql/sqlite3";
const libsql = verbose();

import * as dotenv from "dotenv";
dotenv.config();

const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;
const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
console.log("TURSO_AUTH_TOKEN:", TURSO_AUTH_TOKEN);
console.log("TURSO_DATABASE_URL:", TURSO_DATABASE_URL);

const prodOptions: DataSourceOptions & SeederOptions = {
  type:  "sqlite" , // or "mysql", "sqlite", etc.
  driver: libsql, // Use the imported module directly
  flags: 0x00000040 , // required for TypeORM with libsql
  database: process.env.TURSO_DATABASE_URL + "?authToken=" + process.env.TURSO_AUTH_TOKEN || process.env.PROD_DATABASE_URL ,
  synchronize: false,
  logging: false,
  entities: [Region, Category, PaymentMethod, PaymentStatus, OrderStatus, Order, Invoice ], // List your entities here
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
  
}

const devOptions: DataSourceOptions & SeederOptions = {
  type: "better-sqlite3",
  database: process.env.DEV_DATABASE_URL || "dev-database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Region, Category, PaymentMethod, PaymentStatus, OrderStatus, Order, Invoice ], // List your entities here
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
}



const env : NodeEnvironment = process.env.NODE_ENV ;
console.log(`Current Environment: ${env}`);
let options: DataSourceOptions & SeederOptions;

if (env === "production") {
  options = prodOptions;
} else {
  options = devOptions;
}
  
export const AppDataSource = new DataSource(options);
