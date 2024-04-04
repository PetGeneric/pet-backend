import { MigrationInterface, QueryRunner } from 'typeorm';
import { ScheduleStatus } from '../../../../../src/client/schedules/schedule-status.enum';

export class CreateSchedulesTable1711571471778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "schedules" (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
            status VARCHAR DEFAULT '${ScheduleStatus.PENDING} 'NOT NULL,
            pet_id uuid NOT NULL,
            start_date TIMESTAMP NOT NULL,
            end_date TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP
            )
        `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "schedules_id_uindex" ON "schedules"("id")`,
    );

    await queryRunner.query(`
            ALTER TABLE "schedules"
            ADD CONSTRAINT "fk_pet_id"
            FOREIGN KEY ("pet_id")
            REFERENCES "pets"("id")
            ON DELETE CASCADE
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "schedules_id_uindex"`);
    await queryRunner.query(`DROP TABLE "schedules"`);
  }
}
