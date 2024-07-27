import { users } from '../base/database/entities/users.entity';
import { UserStatusEnum } from '../base/enums/user-status.enum';
import { Mapped } from '../base/utils/mapper/mapper.decorator';
import { MappedWithEntity } from '../base/utils/mapper/mapper.types';

export class UserOutputDto implements MappedWithEntity<users> {
  @Mapped() id: number;
  @Mapped() name?: string;
  @Mapped() password?: string;
  @Mapped() family?: string;
  @Mapped() phone: string;
  @Mapped() status: UserStatusEnum;
  @Mapped() created_at: Date;
}
