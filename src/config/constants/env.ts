import * as dotenv from 'dotenv';

dotenv.config();

export const Env = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_DIALECT: process.env.DB_DIALECT,

  HOST: process.env.HOST,
  PORT: process.env.PORT,

  NODE_ENV: process.env.NODE_ENV,

  SWAGGER_UNAME: process.env.SWAGGER_UNAME,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_TOKEN_EXPIRATION: '24h',

  DB_URI: process.env.DB_URI,
};
