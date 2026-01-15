import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";
import { Order } from "./order.entity.js";

@ObjectType() // TypeGraphQL
@Entity("invoices") // TypeORM
export class Invoice {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Float)
  @Column({ type: "decimal", precision: 10, scale: 2 })
  tax_amount: number;

  @Field(() => Float)
  @Column({ type: "decimal", precision: 10, scale: 2 })
  grand_total: number;

  @Field(() => String)
  @Column({ type: "date" })
  billing_date: string;

  // 1. The Relation: Used for joining/loading the full object
  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.invoices)
  @JoinColumn({ name: "order_id" }) // Explicitly name the DB column
  order: Relation<Order>; 

  // 2. The ID Column: Used for direct ID access and updates
  @Field(() => ID)
  @Column({ type: "int" }) // Maps to the same "order_id" column in DB
  order_id: number;
}
