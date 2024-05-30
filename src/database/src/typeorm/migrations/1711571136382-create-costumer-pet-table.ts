import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCostumerPetTable1711571136382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "costumers_pets" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
            "costumer_id" uuid NOT NULL,
            "pet_id" uuid NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP
        )
    `);

    await queryRunner.query(
      `CREATE UNIQUE INDEX "costumer_pets_pk" ON "costumers_pets"("id")`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX "costumer_pets_id_uindex" ON "costumers_pets"("id")`,
    );

    await queryRunner.query(`
            ALTER TABLE "costumers_pets" ADD CONSTRAINT "fk_costumer_id"
            FOREIGN KEY ("costumer_id")
            REFERENCES "costumer"("id")
            ON DELETE CASCADE
        `);

    await queryRunner.query(`
            ALTER TABLE "costumers_pets" ADD CONSTRAINT "fk_pet_id"
            FOREIGN KEY ("pet_id")
            REFERENCES "pets"("id")
            ON DELETE CASCADE
         `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "costumers_pets" DROP CONSTRAINT "fk_pet_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "costumers_pets" DROP CONSTRAINT "fk_costumer_id"`,
    );
    await queryRunner.query(`DROP INDEX "costumer_pets_id_uindex"`);
    await queryRunner.query(`DROP INDEX "costumer_pets_pk"`);
    await queryRunner.query(`DROP TABLE "costumer_pets"`);
  }
}
