import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity()
export class logs extends AbstractEntity {
  @Column()
  level: string;

  @Column()
  message: string;
}
