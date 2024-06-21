import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHistory1718763811399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            foreignKeyConstraintName: 'FK_pet_history_id',
          },
          {
            name: 'pet_id',
            type: 'uuid',
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'service_id',
            type: 'uuid',
          },
          {
            name: 'schedule_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'pet_history_pet_id_fk',
            columnNames: ['pet_id'],
            referencedTableName: 'pets',
            referencedColumnNames: ['id'],
          },
          {
            name: 'pet_history_company_id_fk',
            columnNames: ['company_id'],
            referencedTableName: 'company',
            referencedColumnNames: ['id'],
          },
          {
            name: 'pet_history_service_id_fk',
            columnNames: ['service_id'],
            referencedTableName: 'services',
            referencedColumnNames: ['id'],
          },
          {
            name: 'pet_history_schedule_id_fk',
            columnNames: ['schedule_id'],
            referencedTableName: 'schedules',
            referencedColumnNames: ['id'],
          },
        ],
        indices: [
            {
                name: 'pet_history_pet_id_index',
                columnNames: ['pet_id'],
            },
            {
                name: 'pet_history_company_id_index',
                columnNames: ['company_id'],
            },
            {
                name: 'pet_history_service_id_index',
                columnNames: ['service_id'],
            },
            {
                name: 'pet_history_schedule_id_index',
                columnNames: ['schedule_id'],
            },
        ]
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pet_history');
  }
}

