import { applyDecorators } from '@nestjs/common';
import { ColumnOptions, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { getTZ } from '../utils/local-moment';

const options = getTZ() === 'UTC' ? { default: () => 'getUTCDate()' } : {};

export const CreateDateUTCColumn = (args: ColumnOptions = undefined) => {
  return applyDecorators(CreateDateColumn({ ...options, ...args }));
};

export const UpdateDateUTCColumn = (args: ColumnOptions = undefined) => {
  return applyDecorators(UpdateDateColumn({ ...options, ...args }));
};
