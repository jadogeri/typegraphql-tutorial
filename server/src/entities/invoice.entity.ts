import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
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

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.invoices)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Field(() => String)
  @Column({ type: "int" })
  order_id: number;
}
