import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom route decorators
export const Car = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const car = request.car;

    return data ? car && car[data] : car;
  },
);
