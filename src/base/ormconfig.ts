import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });
const config = {
  type: 'postgres',
  host: process.env.PG_HOST, //'localhost', //'postgres-container',
  port: parseInt(process.env.PG_PORT, 10), //5432, //34779,
  username: process.env.PG_USER, //'postgres', //'root',
  password: process.env.PG_PASSWORD, //'123456', //'LqkcJVMbJLRMjXTXmfVlXupW'
  database: process.env.PG_DATABASE, //'wordMaker',
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
