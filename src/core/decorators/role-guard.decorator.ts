import { SetMetadata } from '@nestjs/common';
import { RolesReference } from '../../admin/enums/roles.enum';

export const ROLES_GUARD_METADATA_KEY = Symbol('rolesGuard');

export interface RolesGuard {
  (...roles: RolesReference[]): any;
}
export const RolesGuard = (...roles: RolesReference[]) =>
  SetMetadata(ROLES_GUARD_METADATA_KEY, roles);
