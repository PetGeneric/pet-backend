import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ScheduleStatus } from '../schedule-status.enum';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  status: ScheduleStatus;

  @IsDate()
  @IsNotEmpty()
  start: Date;

  @IsDate()
  @IsNotEmpty()
  end: Date;

  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @IsUUID()
  @IsNotEmpty()
  petId: string;

}
