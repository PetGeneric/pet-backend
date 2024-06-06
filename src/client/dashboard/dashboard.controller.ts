import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { Users } from 'src/database/src/entities/users.entity';

@Controller('client/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboardData(@CurrentUser() user:Users) {
    return this.dashboardService.getDashboardData(user);
  }
}
