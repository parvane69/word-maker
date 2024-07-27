import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TokenService } from '../token/token.service';
import { BazarModule } from '../base/webServices/bazar/bazar.module';
import { LogModule } from '../base/logger/log.module';
import { PurchasesRepository } from './purchase.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { purchases } from '../base/database/entities/purchase.entity';
@Module({
  imports: [
    HttpModule,
    BazarModule,
    LogModule,
    TypeOrmModule.forFeature([purchases]),
  ],
  providers: [PurchaseService, TokenService, PurchasesRepository],
  controllers: [PurchaseController],
  exports: [PurchaseService],
})
export class PurchaseModule {}
