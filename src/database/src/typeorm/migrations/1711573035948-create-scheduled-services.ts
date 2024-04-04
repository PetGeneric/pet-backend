import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScheduledServices1711573035948 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "scheduled_services" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "service_id" uuid NOT NULL,
                "schedule_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP,
                "deleted_at" TIMESTAMP
            )        
        `)

        await queryRunner.query(`
            CREATE INDEX "scheduled_services_service_id_index" ON "scheduled_services"("service_id");
        `)

        await queryRunner.query(`
            CREATE INDEX "scheduled_services_schedule_id_index" ON "scheduled_services"("schedule_id");
        `)

        await queryRunner.query(`
            ALTER TABLE "scheduled_services"
            ADD CONSTRAINT "scheduled_services_service_id_fk"
            FOREIGN KEY ("service_id")
            REFERENCES "services"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `)

        await queryRunner.query(`
            ALTER TABLE "scheduled_services"
            ADD CONSTRAINT "scheduled_services_schedule_id_fk"
            FOREIGN KEY ("schedule_id")
            REFERENCES "schedules"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `)




    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "scheduled_services_service_id_index";
        `)

        await queryRunner.query(`
            DROP INDEX "scheduled_services_schedule_id_index";
        `)

        await queryRunner.query(`
            ALTER TABLE "scheduled_services"
            DROP CONSTRAINT "scheduled_services_service_id_fk";
        `)

        await queryRunner.query(`
            ALTER TABLE "scheduled_services"
            DROP CONSTRAINT "scheduled_services_schedule_id_fk";
        `)

        await queryRunner.query(`
            DROP TABLE "scheduled_services";
        `)
    }

}
