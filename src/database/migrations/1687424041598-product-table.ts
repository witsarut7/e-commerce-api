import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName } from '../table-name.enum';
import { defaultTableOptions } from '../default-table-options';

export class productTable1687424041598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.PRODUCT,
        columns: [
          ...defaultTableOptions,
          {
            name: 'product_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'numeric',
            precision: 10,
            scale: 2,
            default: 0.0,
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.PRODUCT);
  }
}
