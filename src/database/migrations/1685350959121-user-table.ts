import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName } from '../table-name.enum';
import { defaultTableOptions } from '../default-table-options';

export class userTable1685350959121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.USER,
        columns: [
          ...defaultTableOptions,
          {
            name: 'first_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.USER);
  }
}
