import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PurchaseInputDto {
  @IsNotEmpty({ message: ' package_name نمیتواند خالی باشد' })
  @ApiProperty({ example: 'package_name' })
  package_name: string;

  @ApiProperty()
  product_id: number;

  @ApiProperty({ example: 'purchase_token' })
  purchase_token: string;
}
export class PurchaseSaveInputDto {
  package_name: string;

  product_id: number;

  purchase_token: string;
}
