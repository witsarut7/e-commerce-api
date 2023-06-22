import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { TableName } from '../table-name.enum';
import { CommonEntity } from '../common-entity';
import { ProductGroups } from '../enum/product-groups.enum';

@Entity(TableName.PRODUCT)
export class Product extends CommonEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [ProductGroups.PRODUCT_VIEW, ProductGroups.PRODUCT_LIST],
  })
  productName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [ProductGroups.PRODUCT_VIEW, ProductGroups.PRODUCT_LIST],
  })
  description: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  @Expose({
    groups: [ProductGroups.PRODUCT_VIEW, ProductGroups.PRODUCT_LIST],
  })
  price: number;
}
