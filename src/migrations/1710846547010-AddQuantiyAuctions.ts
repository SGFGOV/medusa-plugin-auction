/* eslint-disable require-jsdoc */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuantityAuctions1710846547010 implements MigrationInterface {
    name = "AddQuantityAuctions1710846547010";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "auction" ADD COLUMN IF NOT EXISTS "quantity" integer NOT NULL DEFAULT 0`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP COLUMN "quantity"`);
    }
}
