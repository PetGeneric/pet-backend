import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoles1712262009423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "roles" (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        role_reference character varying NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "roles"
    `);
  }
}
