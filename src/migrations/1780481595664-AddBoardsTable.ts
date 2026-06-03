import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBoardsTable1780481595664 implements MigrationInterface {
    name = 'AddBoardsTable1780481595664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(100), "projectId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "FK_074efe1a079786d8c076bf00fff" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "FK_074efe1a079786d8c076bf00fff"`);
        await queryRunner.query(`DROP TABLE "boards"`);
    }

}
