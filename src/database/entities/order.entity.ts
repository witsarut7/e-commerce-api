import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TableName } from '../table-name.enum';
import { CommonEntity } from '../common-entity';
import { User } from './user.entity';
import { Product } from './product.entity';
import { OrderGroups } from '../enum/order-groups.enum';

@Entity(TableName.ORDER)
export class Order extends CommonEntity {
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  @Expose({
    groups: [OrderGroups.ORDER_LIST, OrderGroups.ORDER_VIEW],
  })
  totalPrice: number;

  @Column({ type: 'int4', nullable: true })
  @Expose({
    groups: [OrderGroups.ORDER_LIST, OrderGroups.ORDER_VIEW],
  })
  quantity: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  @Expose({
    groups: [OrderGroups.ORDER_LIST, OrderGroups.ORDER_VIEW],
  })
  orderStatus: boolean;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Exclude()
  @Column({ name: 'product_id', nullable: true })
  productId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  createdBy: User;

  @Exclude()
  @Column({ name: 'user_id', nullable: true })
  createdById: number;
}
