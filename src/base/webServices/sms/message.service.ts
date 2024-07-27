import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

const MESSAGE_WAY_HOST = 'https://api.msgway.com';
const Api_Key = '1a68db60037335004c5b7396bca0c190';

@Injectable()
export class MessageService {
  constructor(private readonly httpService: HttpService) {}

  async sendSMS(mobile: string, confirmation_code: number): Promise<string> {
    const url = `${MESSAGE_WAY_HOST}/send`;
    const headers = {
      apiKey: Api_Key,
    };
    const data = {
      method: 'sms',
      mobile: mobile.replace('+98', '0'),
      code: confirmation_code.toString(),
      templateID: 12,
    };

    try {
      const response = await this.httpService
        .post(url, data, { headers })
        .toPromise();
      return response.data.referenceID;
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        throw new Error(error.response.data);
      }
      throw error;
    }
  }
}
