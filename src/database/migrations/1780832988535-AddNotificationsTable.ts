import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotificationsTable1780832988535 implements MigrationInterface {
  name = "AddNotificationsTable1780832988535";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."notifications_type_enum" AS ENUM(
        'task_assigned',
        'comment_added',
        'task_updated',
        'workspace_invited',
        'task_due_soon'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "notifications" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "type" "public"."notifications_type_enum" NOT NULL,
        "message" character varying(250) NOT NULL,
        "isRead" boolean NOT NULL DEFAULT false,
        "metaData" jsonb,
        "userId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "notifications"
      ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
  }
}