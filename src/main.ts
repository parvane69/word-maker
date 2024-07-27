import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './base/logger/custom-logger';
import { LogService } from './base/logger/log.service';
import { AllExceptionsFilter } from './base/logger/exception-filter';
//import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // log errors
  const logger = app.get(CustomLogger);
  app.useLogger(logger);
  //log exception
  const logService = app.get(LogService);
  app.useGlobalFilters(new AllExceptionsFilter(logService));
  //app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('WordMakers Api')
    .setDescription('The WordMaker description')
    .setExternalDoc('OpenAPI Json Schema', '/api/docs-json')
    .addServer('http://localhost:3002/', 'Local environment')
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      syntaxHighlight: {
        theme: 'monokai',
      },
    },
  });
  await app.listen(3002);
}
bootstrap();
