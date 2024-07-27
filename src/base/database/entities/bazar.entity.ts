import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity()
export class bazar extends AbstractEntity {
  @Column()
  access_token: string;

  @Column()
  refresh_token: string;
}
