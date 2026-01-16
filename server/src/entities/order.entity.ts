
/**
 * @author Joseph Adogeri
 * @version 1.0.0
 * @since 15-JAN-2026
 * @filename order.entity.ts
 * @file Order Entity Definition using TypeORM and TypeGraphQL
 */
import { Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Invoice } from "./invoice.entity.js";

@ObjectType()
@Entity("orders")
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Invoice])
  @OneToMany(() => Invoice, (invoice) => invoice.order)
  invoices: Invoice[];
}
