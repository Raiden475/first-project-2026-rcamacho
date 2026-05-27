import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { envs } from '../config/envs.js';
import { Book } from '../entities/book.entity.js';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: envs.host_db,
  port: envs.port_db,
  username: envs.user_db,
  password: envs.password_db,
  database: envs.database,
  entities: [Book],
  synchronize: true,
  logging: false,
});
