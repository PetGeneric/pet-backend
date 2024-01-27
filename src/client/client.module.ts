import { Module } from '@nestjs/common';
import { CostumerModule } from './costumer/costumer.module';
import { PetsModule } from './pets/pets.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ServicesModule } from './services/services.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [CostumerModule, PetsModule, SchedulesModule, ServicesModule, CompanyModule, EmployeeModule]
})
export class ClientModule {}
