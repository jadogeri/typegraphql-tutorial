import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchemaSetup1768585254631 implements MigrationInterface {
    name = 'InitialSchemaSetup1768585254631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "region" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_8d766fc1d4d2e72ecd5f6567a02" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "category" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payment_method" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_6101666760258a840e115e1bb11" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payment_status" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_c40779d4c0c38f81cc13da11feb" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order_status" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_96a7efa43bbc9ad9bc137016d8b" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "invoices" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "tax_amount" decimal(10, 2) NOT NULL,
                "grand_total" decimal(10, 2) NOT NULL,
                "billing_date" date NOT NULL,
                "order_id" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_invoices" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "tax_amount" decimal(10, 2) NOT NULL,
                "grand_total" decimal(10, 2) NOT NULL,
                "billing_date" date NOT NULL,
                "order_id" integer NOT NULL,
                CONSTRAINT "FK_ea83c3b911906a3578de2340fdf" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_invoices"(
                    "id",
                    "tax_amount",
                    "grand_total",
                    "billing_date",
                    "order_id"
                )
            SELECT "id",
                "tax_amount",
                "grand_total",
                "billing_date",
                "order_id"
            FROM "invoices"
        `);
        await queryRunner.query(`
            DROP TABLE "invoices"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_invoices"
                RENAME TO "invoices"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "invoices"
                RENAME TO "temporary_invoices"
        `);
        await queryRunner.query(`
            CREATE TABLE "invoices" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "tax_amount" decimal(10, 2) NOT NULL,
                "grand_total" decimal(10, 2) NOT NULL,
                "billing_date" date NOT NULL,
                "order_id" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "invoices"(
                    "id",
                    "tax_amount",
                    "grand_total",
                    "billing_date",
                    "order_id"
                )
            SELECT "id",
                "tax_amount",
                "grand_total",
                "billing_date",
                "order_id"
            FROM "temporary_invoices"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_invoices"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            DROP TABLE "invoices"
        `);
        await queryRunner.query(`
            DROP TABLE "order_status"
        `);
        await queryRunner.query(`
            DROP TABLE "payment_status"
        `);
        await queryRunner.query(`
            DROP TABLE "payment_method"
        `);
        await queryRunner.query(`
            DROP TABLE "category"
        `);
        await queryRunner.query(`
            DROP TABLE "region"
        `);
    }

}
