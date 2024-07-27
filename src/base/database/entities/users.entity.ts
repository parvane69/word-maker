import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { UserStatusEnum } from '../../enums/user-status.enum';
import { purchases } from './purchase.entity';

@Entity()
@Unique(['phone'])
export class users extends AbstractEntity {
  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: 0 })
  confirmation_code: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  family: string;

  @Column({ default: UserStatusEnum.PENDING })
  status: UserStatusEnum;

  @OneToMany(() => purchases, (purchase) => purchase.user)
  purchases: purchases[];
}
