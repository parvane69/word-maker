import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { products } from '../base/database/entities/product.entity';
import { AccessLevelEnum } from '../base/enums/access-levels.enum';
@Injectable()
export class SeedsService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  async saveProducts(): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(products)
      .values([
        {
          price: 1800000,
          title: 'نسخه پایه',
          description: 'دارای دسترسی تا مرحله سوم',
          accessLevel: AccessLevelEnum.BASIC,
          restrictedAccessLevels: [AccessLevelEnum.COMPLETE],
        },
        {
          price: 2400000,
          title: 'نسخه کامل',
          description: 'دارای دسترسی تا مرحله پنجم',
          accessLevel: AccessLevelEnum.COMPLETE,
          restrictedAccessLevels: [AccessLevelEnum.COMPLETE],
        },
        {
          price: 0,
          title: 'ویژه تست',
          description: '',
          accessLevel: AccessLevelEnum.FREE,
          restrictedAccessLevels: [],
        },
        {
          price: 600000,
          title: 'تفاوت نسخه پایه و کامل',
          description: '',
          accessLevel: AccessLevelEnum.COMPLETE,
          restrictedAccessLevels: [],
        },
      ])
      .execute();
  }
}
