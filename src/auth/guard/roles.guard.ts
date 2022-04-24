import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Global,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';

@Injectable()
@Global()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: string[], currentUserRole: string) {
    log('mathcRoles : ', roles, currentUserRole);
    const index = roles.indexOf(currentUserRole);
    return index >= 0;
  }
}
