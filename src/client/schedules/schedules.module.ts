import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../../database/src/entities/schedules.entity';
import { ScheduledPets } from '../../database/src/entities/scheduled-pets.entity';
import { PetHistoryService } from '../pet-history/pet-history.service';
import { PetHistoryModule } from '../pet-history/pet-history.module';
import { PetHistory } from 'src/database/src/entities/pet-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, ScheduledPets, PetHistory]),
    PetHistoryModule,
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
