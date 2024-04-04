import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveScheduledServiceTable1711627664445
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "scheduled_services_service_id_index";
        `);

    await queryRunner.query(`
            DROP INDEX "scheduled_services_schedule_id_index";
        `);

    await queryRunner.query(`
            ALTER TABLE "scheduled_services"
            DROP CONSTRAINT "scheduled_services_service_id_fk";
        `);

    await queryRunner.query(`
            ALTER TABLE "scheduled_services"
            DROP CONSTRAINT "scheduled_services_schedule_id_fk";
        `);

    await queryRunner.query(`
            DROP TABLE "scheduled_services";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
