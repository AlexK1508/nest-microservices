import { ConnectionOptions } from 'typeorm';
import * as dotEnv from 'dotenv';

dotEnv.config();

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

export const ORM_CONFIG: ConnectionOptions = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT, 10),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  entities: [`${__dirname}/../**/*.entity.ts`],
  synchronize: true,
  logging: true,
};
