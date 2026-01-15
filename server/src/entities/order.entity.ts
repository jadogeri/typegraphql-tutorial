import { Entity, PrimaryGeneratedColumn, OneToMany, In } from "typeorm";
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
