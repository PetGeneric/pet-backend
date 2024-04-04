import { MigrationInterface, QueryRunner } from 'typeorm';
import { Status } from "../../../../core/status.enum";

export class InitialCompany1642974413176 implements MigrationInterface {
    name = 'InitialCompany1642974413176';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(          `
            CREATE TABLE "company" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
            "name" character varying(255) NOT NULL,
            "description" character varying(255),
            "phone" character varying(255) NOT NULL,
            "email" character varying(255) NOT NULL,
            "status" integer DEFAULT ${Status.TRIAL} NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP,
            "deleted_at" TIMESTAMP
        )`);

        await queryRunner.query(`CREATE UNIQUE INDEX "company_pk" ON "company"("id")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "company_id_uindex" ON "company"("id")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "company_name_uindex" ON "company"("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "company_name_uindex"`);
        await queryRunner.query(`DROP INDEX "company_id_uindex"`);
        await queryRunner.query(`DROP INDEX "company_pk"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }
}
