import { Mapped } from '../../utils/mapper/mapper.decorator';

export class BazarLoginInputDto {
  access_token: string;

  refresh_token: string;
}

export class BazarLoginOutputDto {
  @Mapped() id: number;

  @Mapped() access_token: string;

  @Mapped() refresh_token: string;

  @Mapped() created_at: Date;
}
