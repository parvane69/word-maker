import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bazar } from '../../database/entities/bazar.entity';
import { BazarRepository } from './bazar.repository';
import { BazarService } from './bazar.service';
import { HttpModule } from '@nestjs/axios';
import { LogModule } from '../../logger/log.module';

@Module({
  imports: [
    HttpModule,
    LogModule,
    TypeOrmModule.forFeature([bazar]), // اضافه کردن Entity به ماژول
  ],
  providers: [BazarService, BazarRepository],
  exports: [BazarRepository, BazarService],
})
export class BazarModule {}
