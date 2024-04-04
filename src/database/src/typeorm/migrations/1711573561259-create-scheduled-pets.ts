import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScheduledPets1711573561259 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "scheduled_pets" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
                "pet_id" uuid NOT NULL,
                "schedule_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP,
                "deleted_at" TIMESTAMP
            )
        `)

        await queryRunner.query(` CREATE UNIQUE INDEX "scheduled_pets_pk" ON "scheduled_pets"("id")`)

        await queryRunner.query(`
            ALTER TABLE "scheduled_pets"
            ADD CONSTRAINT "scheduled_pets_id_fk"
            FOREIGN KEY ("pet_id")
            REFERENCES "pets" ("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `)

        await queryRunner.query(`
            ALTER TABLE "scheduled_pets"
            ADD CONSTRAINT "schedule_id_fk"
            FOREIGN KEY ("schedule_id")
            REFERENCES "schedules" ("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scheduled_pets" DROP CONSTRAINT "schedule_id_fk"`)
        await queryRunner.query(`ALTER TABLE "scheduled_pets" DROP CONSTRAINT "scheduled_pets_id_fk"`)
        await queryRunner.query(`DROP INDEX "scheduled_pets_pk"`)
        await queryRunner.query(`DROP TABLE "scheduled_pets"`)
    }

}
