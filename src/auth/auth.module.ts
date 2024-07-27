import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';
import { MapperService } from '../base/utils/mapper/mapper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../user/user.repository';
import { MessageService } from '../base/webServices/sms/message.service';
import { HttpModule } from '@nestjs/axios';
import { EmailModule } from '../base/webServices/email/email.module';
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UsersRepository]),
    HttpModule,
    EmailModule,
  ],
  providers: [AuthService, MapperService, MessageService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
