import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCommentUpdatedAtTypo1781548880504 implements MigrationInterface {
    name = 'FixCommentUpdatedAtTypo1781548880504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "updateAt" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "updatedAt" TO "updateAt"`);
    }
}