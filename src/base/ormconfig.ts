import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });
const config = {
  type: 'postgres',
  host: 'localhost', //'robin.iran.liara.ir',
  port: 5432, //34779,
  username: 'postgres', //'root',
  password: '123456', //'LqkcJVMbJLRMjXTXmfVlXupW'
  database: 'wordMaker',
  entities: ['dist/base/database/entities/*.entity{.ts,.js}'],
  migrations: ['dist/base/database/migrations/*{.ts,.js}'],
  subscribers: ['dist/base/database/subscribers/*.subscriber{.ts,.js}'],
  autoLoadEntities: true,
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
