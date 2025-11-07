import 'dotenv/config';

export const Env = {
  NODE_ENV: process.env.NODE_ENV,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_TOKEN_EXPIRATION: '24h',

  DB_URI: process.env.DB_URI,
};
