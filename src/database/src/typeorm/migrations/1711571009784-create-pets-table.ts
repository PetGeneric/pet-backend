import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePetsTable1711571009784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "pets" (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
                name VARCHAR(255) NOT NULL,
                age INTEGER ,
                breed VARCHAR(255),
                species_id uuid NOT NULL,
                birthday_date TIMESTAMP,
                company_id uuid NOT NULL,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP,
                deleted_at TIMESTAMP
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "pet_id_uindex" ON "pets"("id")
        `);


        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD CONSTRAINT fk_species_id
            FOREIGN KEY (species_id)
            REFERENCES species(id)
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD CONSTRAINT fk_company_id
            FOREIGN KEY (company_id)
            REFERENCES company(id)
            ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE "pets" DROP CONSTRAINT fk_specie_id
        `);

        await queryRunner.query(`
            ALTER TABLE "pets" DROP CONSTRAINT fk_company_id
        `);

        await queryRunner.query(`
            DROP INDEX "pet_id_uindex"
        `);

        await queryRunner.query(`
            DROP TABLE "pets"
        `);
    }

}
