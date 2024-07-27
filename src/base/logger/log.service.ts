import { Injectable } from '@nestjs/common';
import { LogsRepository } from './log.repository';

@Injectable()
export class LogService {
  constructor(private readonly logsRepository: LogsRepository) {}

  async createLog(level: string, message: string) {
    if (await this.shouldLog(message))
      await this.logsRepository.save(level, message);
  }

  async shouldLog(message: string): Promise<boolean> {
    const lastLog = await this.logsRepository.findLastLogsWithMessage(message);
    if (lastLog) {
      const currentTime = new Date();
      const lastLogTime = new Date(lastLog.created_at);
      const timeDifference =
        (currentTime.getTime() - lastLogTime.getTime()) / 1000 / 60;

      return timeDifference > 1;
    } else return true;
  }
}
