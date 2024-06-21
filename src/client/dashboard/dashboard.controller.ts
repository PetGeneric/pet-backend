import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { User } from 'src/database/src/entities/user.entity';

@Controller('client/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboardData(@CurrentUser() user: User) {
    return this.dashboardService.getDashboardData(user);
  }
}
