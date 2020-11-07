/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// RolesGuard 예제
// Guard는 각 Middleware 이후, Interceptors 또는 Pipes 전에 실행된다.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return true;
    // matchRoles를 구현하면 Role 체크가 가능하다.
    // return matchRoles(roles, user.roles);
  }
}
