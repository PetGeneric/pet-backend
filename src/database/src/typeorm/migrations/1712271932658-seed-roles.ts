import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1712271932658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO roles (role_reference) VALUES ('admin');
            INSERT INTO roles (role_reference) VALUES ('costumer');
            INSERT INTO roles (role_reference) VALUES ('company-admin');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM roles WHERE role_reference = 'admin';
            DELETE FROM roles WHERE role_reference = 'costumer';
            DELETE FROM roles WHERE role_reference = 'company-admin';
        `);
  }
}
