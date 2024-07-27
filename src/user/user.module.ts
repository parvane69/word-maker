import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UsersRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from '../base/database/entities/users.entity';
import { MapperService } from '../base/utils/mapper/mapper.service';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
@Module({
  imports: [
    TokenModule,
    TypeOrmModule.forFeature([users]), // اضافه کردن Entity به ماژول
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, MapperService, TokenService],
  exports: [UsersRepository],
})
export class UsersModule {}
