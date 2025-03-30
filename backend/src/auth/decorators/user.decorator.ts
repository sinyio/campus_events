import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const requset = ctx.switchToHttp().getRequest();
    const user = requset.user;

    return data ? user[data] : user;
  },
);
