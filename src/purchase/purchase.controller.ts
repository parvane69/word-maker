import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { PurchaseInputDto } from './purchase.dto';

@Controller('purchase')
@UseGuards(AuthGuard)
@ApiTags('Purchase')
@ApiBearerAuth()
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post('/verifyPurchase')
  async verifyPurchase(@Body() purchaseInputDto: PurchaseInputDto) {
    const result = await this.purchaseService.verifyPurchase(purchaseInputDto);
    console.log('verifyPurchase controller', result);
    return result;
  }
}
