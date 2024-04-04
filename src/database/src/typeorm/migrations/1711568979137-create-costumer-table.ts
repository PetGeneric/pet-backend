import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCostumerTable1711568979137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "costumer" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
            "name" character varying(255) NOT NULL,
            "phone" character varying(255) NOT NULL,
            "email" character varying(255) NOT NULL,
            "company_id" uuid NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP,
            "deleted_at" TIMESTAMP
        )
    `)
    await queryRunner.query(`CREATE UNIQUE INDEX "costumer_pk" ON "costumer"("id")`);

    await queryRunner.query(`CREATE UNIQUE INDEX "costumer_id_uindex" ON "costumer"("id")`);

    await queryRunner.query(`CREATE UNIQUE INDEX "costumer_email_uindex" ON "costumer"("email")`);

    await queryRunner.query(`
    ALTER TABLE "costumer" ADD CONSTRAINT "fk_company_id" 
    FOREIGN KEY ("company_id") 
    REFERENCES "company"("id") 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "costumer" DROP CONSTRAINT "fk_company_id"`);
        await queryRunner.query(`DROP INDEX "costumer_email_uindex"`);
        await queryRunner.query(`DROP INDEX "costumer_id_uindex"`);
        await queryRunner.query(`DROP INDEX "costumer_pk"`);
        await queryRunner.query(`DROP TABLE "costumer"`);
    }

}
