import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: Request }>().req;
    return request;
  }
}
