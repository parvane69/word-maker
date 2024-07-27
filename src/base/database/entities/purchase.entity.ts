import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { PurchaseStateEnum } from '../../enums/purchase-state.enum';
import { users } from './users.entity';
import { products } from './product.entity';

@Entity()
export class purchases extends AbstractEntity {
  @Column()
  orderId: string;

  @Column()
  token: string;

  @Column()
  payload: string;

  @Column({ nullable: true })
  packageName: string;

  @Column()
  state: PurchaseStateEnum;

  @Column()
  time: number;

  @Column({ nullable: true })
  originalJson: string;

  @Column({ nullable: true })
  dataSignature: string;

  @ManyToOne(() => users, (user) => user.purchases)
  @JoinColumn({ name: 'user_id' })
  user: users;

  @Column()
  user_id: number;

  @ManyToOne(() => products, (product) => product.purchases)
  @JoinColumn({ name: 'product_id' })
  product: products;

  @Column()
  product_id: number;
}
