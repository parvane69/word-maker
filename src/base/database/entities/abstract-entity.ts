import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import {
  CreateDateUTCColumn,
  UpdateDateUTCColumn,
} from '../../decorators/date.decorator';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateUTCColumn()
  created_at: Date;

  @UpdateDateUTCColumn({ nullable: true })
  updated_at: Date;
}
