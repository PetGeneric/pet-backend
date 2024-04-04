import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployeeTable1711574161256 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE "employee" (
                "id" SERIAL PRIMARY KEY,
                "first_name" character varying(255) NOT NULL,
                "last_name" character varying(255),
                "user_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP,
                "deleted_at" TIMESTAMP
            )
        `)

        await queryRunner.query(`CREATE UNIQUE INDEX "employee_pk" ON "employee"("id")`);

        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD CONSTRAINT "fk_employee_user_id"
            FOREIGN KEY ("user_id")
            REFERENCES "users"("id")
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "fk_employee_user_id"`);
        await queryRunner.query(`DROP INDEX "employee_pk"`);
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
