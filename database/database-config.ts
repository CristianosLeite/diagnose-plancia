import { Dialect, Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

type DbConfig = {
  host: string;
  user: string;
  password: string;
  db: string;
  dialect: Dialect;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
};

export const dbConfig: DbConfig = {
  host: String(process.env['HOST_DATABASE']),
  user: String(process.env['USERNAME_DASTABASE']),
  password: String(process.env['PASSWORD_DATABASE']),
  db: String(process.env['DATABASE_NAME']),
  dialect: String(process.env['DIALECT_DATABASE']) as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

export const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
