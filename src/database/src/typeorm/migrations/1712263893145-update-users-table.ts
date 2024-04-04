import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersTable1712263893145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            DROP COLUMN "role"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
