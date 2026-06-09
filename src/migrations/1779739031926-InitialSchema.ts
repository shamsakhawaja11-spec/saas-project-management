import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1779739031926 implements MigrationInterface {
  name = "InitialSchema1779739031926";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users table first - no dependencies
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "email" character varying(100) NOT NULL,
        "password" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    // Workspaces table - depends on users
    await queryRunner.query(`
      CREATE TABLE "workspaces" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "description" character varying(255),
        "ownerId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_workspaces" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "workspaces"
      ADD CONSTRAINT "FK_workspaces_owner"
      FOREIGN KEY ("ownerId") REFERENCES "users"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // Projects table - depends on workspaces
    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "description" character varying(123),
        "workspaceId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "projects"
      ADD CONSTRAINT "FK_108ff8a2d40c2b294511c92a7c8"
      FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_108ff8a2d40c2b294511c92a7c8"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP CONSTRAINT "FK_workspaces_owner"`);
    await queryRunner.query(`DROP TABLE "workspaces"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}