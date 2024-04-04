import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1711635879849 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.query(`
            CREATE TABLE users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role user_role NOT NULL,
                is_active BOOLEAN DEFAULT FALSE,
                company_id UUID NOT NULL,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP
            );
        `)

        await queryRunner.query(`
            CREATE INDEX user_pk ON users (id);
        `)

        await queryRunner.query(`
            CREATE INDEX user_email_uindex ON users (email);
        `)

        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD CONSTRAINT "fk_company_id" 
            FOREIGN KEY ("company_id") 
            REFERENCES "company"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
