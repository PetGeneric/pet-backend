import { Module } from '@nestjs/common';
import { CostumerModule } from './costumer/costumer.module';
import { PetsModule } from './pets/pets.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ServicesModule } from './services/services.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { SpeciesModule } from './species/species.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    CostumerModule,
    PetsModule,
    SchedulesModule,
    ServicesModule,
    EmployeeModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SpeciesModule,
    CompanyModule,
    DashboardModule

  ],
})
export class ClientModule {}
