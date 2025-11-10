import 'dotenv/config';

export const Env = {
  NODE_ENV: process.env.NODE_ENV,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_TOKEN_EXPIRATION: Number(process.env.JWT_TOKEN_EXPIRATION),

  DB_URI: process.env.DB_URI,
};
