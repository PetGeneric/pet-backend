import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../database/src/entities/roles.entity';
import { ROLES_GUARD_METADATA_KEY } from '../decorators/role-guard.decorator';
import { Request } from 'express';
import { jwtConstants } from '../../auth/constants/constants';
import { JwtService } from '@nestjs/jwt';
import { RolesReference } from '../../admin/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesReference[]>(
      ROLES_GUARD_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const token = this.extractTokenFromHeader(
      context.switchToHttp().getRequest(),
    );
    if (!token) throw new UnauthorizedException();

    const roles = await this.extractRoleFromToken(token);

    return requiredRoles.some((role) =>
      roles.map((r) => r.roleReference).includes(role),
    );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async extractRoleFromToken(token: string): Promise<Roles[]> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants,
    });

    return payload.roles;
  }
}
