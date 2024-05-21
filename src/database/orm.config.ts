import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  ssl: { rejectUnauthorized: false },
  extra: { sslmode: 'require' },
  entities: [
    join(__dirname, 'src/database/src/typeorm/entities/*.entity{.ts,.js}'),
  ],
  migrations: ['src/database/src/typeorm/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
