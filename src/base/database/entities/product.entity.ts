import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { AccessLevelEnum } from '../../enums/access-levels.enum';
import { purchases } from './purchase.entity';

@Entity()
export class products extends AbstractEntity {
  @Column()
  price: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  accessLevel: AccessLevelEnum;

  @Column('simple-array', { nullable: true })
  restrictedAccessLevels: AccessLevelEnum[];

  @OneToMany(() => purchases, (purchase) => purchase.user)
  purchases: purchases[];
}
