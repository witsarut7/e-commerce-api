import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IJwtUserDecorator {
  sub: string;
  data: {
    id: number;
    username: string;
  };
  iat: number;
}

export const JwtDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IJwtUserDecorator;
  },
);
