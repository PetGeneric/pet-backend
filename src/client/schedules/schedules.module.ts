import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "../../database/src/typeorm/entities/schedules.entity";
import { ScheduledPets } from "../../database/src/typeorm/entities/scheduled-pets.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, ScheduledPets])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
