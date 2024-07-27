import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LogService } from './log.service';

// این کلاس برای ذخیره لاگ گیری تمامی اکسپشن هایی هست که تو سیستم اتفاق میفته
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logService: LogService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: (exception as Error).message };

    // ذخیره لاگ در دیتابیس
    await this.logService.createLog('error', JSON.stringify(message));

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
