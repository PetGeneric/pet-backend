import {
  Controller,
  Get,
} from '@nestjs/common';
import { PetHistoryService } from './pet-history.service';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { User } from 'src/database/src/entities/User.entity';
import { RolesReference } from 'src/admin/enums/roles.enum';
import { RolesGuard } from 'src/core/decorators/role-guard.decorator';

@Controller('client/pet-history')
export class PetHistoryController {
  constructor(private readonly petHistoryService: PetHistoryService) {}

  @RolesGuard(
    RolesReference.EMPLOYEE,
    RolesReference.COMPANY_ADMIN,
    RolesReference.ADMIN,
  )
  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.petHistoryService.findAll(user);
  }
}
