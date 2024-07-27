import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'; //
import ormconfig from './base/ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './user/user.module';
import { EmailModule } from './base/webServices/email/email.module';
import { TokenModule } from './token/token.module';
import { CustomLogger } from './base/logger/custom-logger';
import { LogModule } from './base/logger/log.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormconfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    TokenModule,
    LogModule,
    PurchaseModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
})
export class AppModule {}
