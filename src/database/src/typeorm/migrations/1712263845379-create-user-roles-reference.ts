import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesReference1712263845379
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_role_reference"(
              "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
              "user_id" uuid NOT NULL,
              "role_id" uuid NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "deleted_at" TIMESTAMP
            )
        `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "user_role_preference_idx" ON "user_role_reference"("id")
    `);

    await queryRunner.query(`
            ALTER TABLE "user_role_reference" ADD CONSTRAINT "fk_user_id"
            FOREIGN KEY ("user_id")
            REFERENCES "users"("id")
        `);

    await queryRunner.query(`
            ALTER TABLE "user_role_reference" ADD CONSTRAINT "fk_role_id"
            FOREIGN KEY ("role_id")
            REFERENCES "roles"("id")
         `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "user_role_reference"
      `);
  }
}
