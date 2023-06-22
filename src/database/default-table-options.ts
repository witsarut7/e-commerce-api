import { TableColumnOptions } from 'typeorm';

export const defaultTableOptions: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int4',
    isPrimary: true,
    isGenerated: true,
  },
  {
    name: 'created_at',
    type: 'timestamptz',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'updated_at',
    type: 'timestamptz',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'deleted_at',
    type: 'timestamptz',
    isNullable: true,
  },
];
