import { Status } from 'src/core/status.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCompanyStatus1716331936770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE company ALTER COLUMN status SET DEFAULT '${Status.TRIAL}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
