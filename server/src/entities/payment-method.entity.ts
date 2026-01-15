/**
 * @author Joseph Adogeri
 * @version 1.0.0
 * @since 15-JAN-2026
 * @filename payment-method.entity.ts
 * @file Payment Method Entity Definition using TypeORM and TypeGraphQL
 */
import { IsNumber, IsString } from "class-validator";
import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@ObjectType()
@Entity()
export class PaymentMethod extends BaseEntity { // BaseEntity provides static methods like .find(), .save() etc.
  @Field(() => ID) // Exposes 'id' to GraphQL as an ID type
  @PrimaryGeneratedColumn() // TypeORM primary key
  @IsNumber() // Validation to ensure it's a number
  id!: number;

  @Field(() => String) // Exposes 'name' to GraphQL
  @Column({ type: "varchar", nullable: false, unique: true }) // TypeORM column
  @IsString() // Validation to ensure it's a string
  name!: string;

}