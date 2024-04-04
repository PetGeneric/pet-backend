import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSchedules1711627388920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "schedules"
            ADD COLUMN "service_id" uuid NOT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE "schedules"
            ADD CONSTRAINT "schedule_service_id_fk"
            FOREIGN KEY ("service_id")
            REFERENCES "services"("id")            
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "schedules"
            DROP CONSTRAINT "schedule_service_id_fk"
        `);

    await queryRunner.query(`
            ALTER TABLE "schedules"
            DROP COLUMN "service_id"
        `);
  }
}
