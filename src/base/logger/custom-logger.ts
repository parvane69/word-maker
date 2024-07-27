import { Injectable, ConsoleLogger } from '@nestjs/common';
import { LogService } from './log.service';

// این کلاس برای لاگ گیری خطاهایی هست که تو سیستم اتفاق میفته .
//هر متدی رو که از کامنتی دربیاره لاگ های مربوط به اونر و هم ذخیره میکنه
@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(private readonly logService: LogService) {
    super();
  }

  //   log(message: string) {
  //     super.log(message);
  //     //this.logService.createLog('log', message);
  //   }

  error(message: string, trace: string) {
    super.error(message, trace);
    this.logService.createLog('error', message);
  }

  //   warn(message: string) {
  //     super.warn(message);
  //     //this.logService.createLog('warn', message);
  //   }

  //   debug(message: string) {
  //     super.debug(message);
  //     //this.logService.createLog('debug', message);
  //   }

  //   verbose(message: string) {
  //     super.verbose(message);
  //     //this.logService.createLog('verbose', message);
  //   }
}
