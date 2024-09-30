import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateServiceColors1727634978971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'services',
      new TableColumn({
        name: 'color',
        type: 'varchar',
        isNullable: true,
      }),
    );

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'];
    const services = await queryRunner.query('SELECT id FROM services');
    for (const service of services) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      await queryRunner.query(
        `UPDATE services SET color = '${randomColor}' WHERE id = '${service.id}'`, 
      );
    }

    await queryRunner.changeColumn(
      'services',
      'color',
      new TableColumn({
        name: 'color',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('services', 'color');
  }
}