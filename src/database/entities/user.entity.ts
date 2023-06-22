import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { TableName } from '../table-name.enum';
import { CommonEntity } from '../common-entity';
import { UserGroups } from '../enum/user-groups.enum';
import { Order } from './order.entity';

@Entity(TableName.USER)
export class User extends CommonEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW, UserGroups.USER_LOGIN],
  })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW, UserGroups.USER_LOGIN],
  })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW],
  })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW],
  })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [UserGroups.USER_VIEW, UserGroups.USER_LOGIN],
  })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [UserGroups.USER_LOGIN],
  })
  password: string;

  @OneToMany(() => Order, (order) => order.createdBy, )
  orders: Order[];
}
