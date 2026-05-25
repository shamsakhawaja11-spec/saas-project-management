import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1779739031926 implements MigrationInterface {
    name = 'InitialSchema1779739031926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(123), "workspaceId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_108ff8a2d40c2b294511c92a7c8" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_108ff8a2d40c2b294511c92a7c8"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
