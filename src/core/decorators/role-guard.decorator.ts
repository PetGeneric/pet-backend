import { SetMetadata } from '@nestjs/common';
import { RolesReference } from '../../admin/enums/roles.enum';

export const ROLES_GUARD_METADATA_KEY = 'roles';

export const RolesGuard = (...roles: RolesReference[]) =>
  SetMetadata(ROLES_GUARD_METADATA_KEY, roles);
