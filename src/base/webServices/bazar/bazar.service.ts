import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PurchaseInputDto } from '../../../purchase/purchase.dto';
import { BazarRepository } from './bazar.repository';
import { LogService } from '../../logger/log.service';
import { bazar } from '../../database/entities/bazar.entity';
import { catchError, firstValueFrom } from 'rxjs';

const GATE_WAY_Authorization =
  'https://pardakht.cafebazaar.ir/devapi/v2/auth/token/';

@Injectable()
export class BazarService {
  constructor(
    private readonly httpService: HttpService,
    private readonly bazarRepository: BazarRepository,
    private readonly logService: LogService,
  ) {}

  async loginToBazar(): Promise<string> {
    const data = {
      grant_type: 'authorization_code',
      code: process.env.BAZAR_CODE,
      client_id: process.env.BAZAR_CLIENT_ID,
      client_secret: process.env.BAZAR_CLIENT_SECRET,
      redirect_uri: process.env.BAZAR_REDIRECT_URL,
    };
    try {
      const response = await this.httpService
        .post(GATE_WAY_Authorization, data)
        .toPromise();

      await this.bazarRepository.save({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      });

      return response.data.access_token;
    } catch (error) {
      if (error.response) {
        throw new Error('Login To Bazar Error:' + error.response);
      }
      throw error;
    }
  }
  async getNewAccessToken(lastToken: bazar): Promise<string> {
    const data = {
      grant_type: 'refresh_token',
      client_id: process.env.BAZAR_CLIENT_ID,
      client_secret: process.env.BAZAR_CLIENT_SECRET,
      refresh_token: lastToken.refresh_token,
    };
    try {
      const response = await firstValueFrom(
        this.httpService.post(GATE_WAY_Authorization, data),
      );
      await this.bazarRepository.updateRefreshToken(
        lastToken.id,
        response.data.access_token,
      );
      return response.data.access_token;
    } catch (error) {
      if (error.response) {
        throw new Error('get New AccessToken Error:' + error.response);
      }
      throw error;
    }
  }
  async verifyPurchase(
    purchaseInputDto: PurchaseInputDto,
    access_token: string,
  ): Promise<string> {
    const GATE_WAY_Verify_Purchase = `https://pardakht.cafebazaar.ir/devapi/v2/api/validate/${purchaseInputDto.package_name}/inapp/${purchaseInputDto.product_id}/purchases/${purchaseInputDto.purchase_token}?access_token=${access_token}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(GATE_WAY_Verify_Purchase).pipe(
          catchError((e) => {
            throw new HttpException(e.response.data, e.response.status);
          }),
        ),
      );
      console.log('response purchase', response.status);
      if (response.status == 200) return response.data;
      else {
        this.logService.createLog(
          'purchase bazar',
          response.status + ' ' + response.data,
        );
        return '401';
      }
    } catch (error) {
      this.logService.createLog('error', error.response);
      return '401';
    }
  }
  async getLastToken(): Promise<bazar> {
    return await this.bazarRepository.getLast();
  }
}
