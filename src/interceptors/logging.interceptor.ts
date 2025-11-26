import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphQLLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);

    const operation = gqlCtx.getInfo<{ fieldName: string }>().fieldName;
    const parentType = gqlCtx.getInfo<{ parentType: { name: string } }>()
      .parentType.name;
    const variables = gqlCtx.getArgs<Record<string, unknown>>();

    const startTime = Date.now();

    console.log(`🔵 [GraphQL Request] ${parentType}.${operation}`);
    console.log(`📦 Variables:`, variables);

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - startTime;
        console.log(
          `🟢 [GraphQL Response] ${parentType}.${operation} (${elapsed} ms)`,
        );
      }),
    );
  }
}
