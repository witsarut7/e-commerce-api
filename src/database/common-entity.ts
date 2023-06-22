import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectID,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommonGroups } from './enum/common-groups.enum';

export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  @Expose({ groups: [CommonGroups.COMMON_VIEW] })
  id: ObjectID | number;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Expose({ groups: [CommonGroups.COMMON_VIEW] })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Expose({ groups: [CommonGroups.COMMON_VIEW] })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @Exclude()
  deletedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
