import { Request, Response } from 'express';
import type { Auth } from './auth.type';

export type GqlContext = {
  req: Request & { user?: Auth };
  res: Response;
};
