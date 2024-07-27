import { Injectable } from '@nestjs/common';
import { BazarService } from '../base/webServices/bazar/bazar.service';
import { PurchaseInputDto } from './purchase.dto';
import { bazar } from '../base/database/entities/bazar.entity';
import { PurchasesRepository } from './purchase.repository';
@Injectable()
export class PurchaseService {
  constructor(
    private readonly bazarService: BazarService,
    private readonly purchasesRepository: PurchasesRepository,
  ) {}

  async verifyPurchase(purchaseInputDto: PurchaseInputDto) {
    const token = await this.bazarService.getLastToken();
    const access_token = await this.getAccessToken(token);

    let result;
    result = await this.bazarService.verifyPurchase(
      purchaseInputDto,
      access_token,
    );
    if (result === '401') {
      const access_token = await this.bazarService.getNewAccessToken(token);
      result = await this.bazarService.verifyPurchase(
        purchaseInputDto,
        access_token,
      );
    }
    if (result != '401') {
      await this.purchasesRepository.save({
        ...purchaseInputDto,
      });
    }
    return result;
  }
  private async getAccessToken(token: bazar) {
    let access_token = token.access_token;
    const currentDate = new Date();
    const diffInDays =
      (currentDate.getTime() - token.updated_at.getTime()) / (1000 * 3600 * 24);

    if (diffInDays > 40)
      access_token = await this.bazarService.getNewAccessToken(token);
    return access_token;
  }
  // private async loginToBazar() {
  //   const response = await this.bazarService.loginToBazar();
  //   return response;
  // }
  // private async getNewAccessToken() {
  //   const responseNewAccessToken = await this.bazarService.getNewAccessToken();
  //   return responseNewAccessToken;
  // }
}
