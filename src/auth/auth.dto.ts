import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MappedWithEntity } from '../base/utils/mapper/mapper.types';
import { users } from '../base/database/entities/users.entity';
import { Mapped } from '../base/utils/mapper/mapper.decorator';
import { UserStatusEnum } from '../base/enums/user-status.enum';

export class UserRegistrationInputDto {
  @IsPhoneNumber(null, { message: 'شماره تلفن معتبر نیست' })
  @IsNotEmpty({ message: ' شماره تلفن نمیتواند خالی باشد' })
  @ApiProperty({ example: 'phone', description: 'شماره تلفن ' })
  phone: string;

  @IsOptional()
  @ApiProperty({ example: 'email', description: 'ایمیل' })
  @IsEmail({}, { message: 'ایمیل معتبر نیست' })
  email: string;
}

export class UserRegistrationOutputDto implements MappedWithEntity<users> {
  @Mapped() id: number;
  @Mapped() phone: string;
  @Mapped() email: string;
}

export class UserLoginInputDto {
  @IsPhoneNumber(null, { message: 'شماره تلفن معتبر نیست' })
  @IsNotEmpty({ message: ' شماره تلفن نمیتواند خالی باشد' })
  @ApiProperty({ example: '+989121111111', description: 'شماره تلفن ' })
  phone: string;

  @MinLength(6)
  @MaxLength(6)
  @IsNotEmpty({ message: ' کد تایید  نمیتواند خالی باشد' })
  @ApiProperty({ example: '123456', description: 'کد تایید  ' })
  confirmation_code: string;
}
export class UserOutputDto implements MappedWithEntity<users> {
  @Mapped() id: number;
  @Mapped() name?: string;
  @Mapped() family?: string;
  @Mapped() phone: string;
  @Mapped() email: string;
  @Mapped() status: UserStatusEnum;
  @Mapped() created_at: Date;
}
export class UserLoginOutputDto extends UserOutputDto {
  @Mapped() access_token: string;
}
