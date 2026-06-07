import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeEntriesTable1780770933123 implements MigrationInterface {
    name = 'AddTimeEntriesTable1780770933123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "time_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minutes" integer NOT NULL, "description" character varying, "taskId" uuid NOT NULL, "userId" uuid NOT NULL, "logDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b8bc5f10269ba2fe88708904aa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "time_entries" ADD CONSTRAINT "FK_8cfb57662e88d7c65010311661d" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_entries" ADD CONSTRAINT "FK_d1b452d7f0d45863303b7d30000" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_entries" DROP CONSTRAINT "FK_d1b452d7f0d45863303b7d30000"`);
        await queryRunner.query(`ALTER TABLE "time_entries" DROP CONSTRAINT "FK_8cfb57662e88d7c65010311661d"`);
        await queryRunner.query(`DROP TABLE "time_entries"`);
    }

}
