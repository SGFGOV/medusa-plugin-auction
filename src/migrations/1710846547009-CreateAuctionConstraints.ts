/* eslint-disable require-jsdoc */
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuctionConstrains1710846547009
    implements MigrationInterface
{
    name = "CreateAuctionConstrains1710846547009";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "auction" ADD CONSTRAINT "FK_CreateAuctionConstrains1710846547009_1" FOREIGN KEY ("product_id") ` +
                `REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );

        await queryRunner.query(
            `ALTER TABLE "auction" ADD CONSTRAINT "FK_CreateAuctionConstrains1710846547009_2" FOREIGN KEY ("region_id") ` +
                `REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "auction" DROP CONSTRAINT "FK_CreateAuctionConstrains1710846547009_1"`
        );
        await queryRunner.query(
            `ALTER TABLE "auction" DROP CONSTRAINT "FK_CreateAuctionConstrains1710846547009_2"`
        );
    }
}
