import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersTable1716327510721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "employee"
        ADD CONSTRAINT "fk_employee_user_id"
        FOREIGN KEY ("user_id")
        REFERENCES "users"("id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "employee"
        DROP CONSTRAINT "fk_employee_user_id"
    `);
  }
}
