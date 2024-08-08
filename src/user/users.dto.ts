import { ApiProperty } from '@nestjs/swagger';
import { users } from '../base/database/entities/users.entity';
import { UserStatusEnum } from '../base/enums/user-status.enum';
import { Mapped } from '../base/utils/mapper/mapper.decorator';
import { MappedWithEntity } from '../base/utils/mapper/mapper.types';
import { IsEmail, IsOptional } from 'class-validator';

export class UserOutputDto implements MappedWithEntity<users> {
  @Mapped() id: number;
  @Mapped() name?: string;
  @Mapped() password?: string;
  @Mapped() family?: string;
  @Mapped() phone: string;
  @Mapped() status: UserStatusEnum;
  @Mapped() created_at: Date;
}

export class UserCompletionInputDto {
  @ApiProperty({ example: 'name', description: 'نام' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'family', description: 'نام خانوادگی' })
  @IsOptional()
  family: string;

  @IsOptional()
  @ApiProperty({ example: 'email', description: 'ایمیل' })
  @IsEmail({}, { message: 'ایمیل معتبر نیست' })
  email: string;
}
