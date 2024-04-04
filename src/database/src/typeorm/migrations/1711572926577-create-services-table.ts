import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServicesTable1711572926577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "services" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "description" character varying(255),
                "price" numeric NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP,
                "deleted_at" TIMESTAMP
            )
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX "services_id_uindex" ON "services"("id")
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "services_id_uindex"
        `);

        await queryRunner.query(`
            DROP TABLE "services"
        `);
    }

}
