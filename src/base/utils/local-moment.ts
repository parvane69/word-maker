import * as moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';

export const getTZ = () => {
  const configService: ConfigService = new ConfigService();
  return configService.get<string>('TZ');
};

moment.tz.setDefault(getTZ());
export default moment;
