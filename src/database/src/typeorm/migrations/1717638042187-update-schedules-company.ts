import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateSchedulesCompany1717638042187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('schedules', [
      new TableColumn({
        name: 'company_id',
        type: 'uuid',
        isNullable: false,
      }),
    ]);

    await queryRunner.createForeignKey(
      'schedules',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'company',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('schedules', 'company_id');
    await queryRunner.dropColumn('schedules', 'company_id');
  }
}

