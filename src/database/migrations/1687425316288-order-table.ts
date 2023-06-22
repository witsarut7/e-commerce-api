import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { defaultTableOptions } from '../default-table-options';
import { TableName } from '../table-name.enum';

export class orderTable1687425316288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.ORDER,
        columns: [
          ...defaultTableOptions,
          {
            name: 'total_price',
            type: 'numeric',
            precision: 10,
            scale: 2,
            default: 0.0,
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'int4',
            isNullable: true,
          },
          {
            name: 'order_status',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'product_id',
            type: 'int4',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int4',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys(TableName.ORDER, [
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: TableName.PRODUCT,
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: TableName.USER,
        referencedColumnNames: ['id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.ORDER);
  }
}
