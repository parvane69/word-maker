import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logs } from '../database/entities/logs.entity';

@Injectable()
export class LogsRepository {
  constructor(
    @InjectRepository(logs)
    private readonly repository: Repository<logs>,
  ) {}
  async save(level: string, message: string): Promise<logs> {
    const result = await this.repository.save({ level, message });
    return result;
  }
  async findLastLogsWithMessage(message: string): Promise<logs> {
    const result = await this.repository.findOne({
      where: { message },
      order: { id: 'DESC' },
    });
    return result;
  }
}
