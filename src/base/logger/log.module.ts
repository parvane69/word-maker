import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { CustomLogger } from './custom-logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logs } from '../database/entities/logs.entity';
import { LogsRepository } from './log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([logs])],
  providers: [LogService, CustomLogger, LogsRepository],
  exports: [CustomLogger, LogsRepository, LogService],
})
export class LogModule {}
