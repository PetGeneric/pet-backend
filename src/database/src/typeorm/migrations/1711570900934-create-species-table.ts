import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpeciesTable1711570900934 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "species" (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP,
                deleted_at TIMESTAMP
            )        
        `)

        await queryRunner.query(` CREATE UNIQUE INDEX "species_id_uindex" ON "species"("id")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "species_id_uindex"`)
        await queryRunner.query(`DROP TABLE "species"`)
    }

}
