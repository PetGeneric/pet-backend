import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costumer } from 'src/database/src/entities/costumer.entity';
import { Schedule } from 'src/database/src/entities/schedules.entity';
import { Pet } from 'src/database/src/entities/pet.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Costumer, Schedule, Pet])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
