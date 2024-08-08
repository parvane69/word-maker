import { IsNumber, IsString } from 'class-validator';
import { Mapped } from '../utils/mapper/mapper.decorator';

export class HttpResponseDto {
  @IsNumber()
  @Mapped()
  status: number;

  @IsString()
  @Mapped()
  message: string;

  @Mapped()
  data?: any;
}
