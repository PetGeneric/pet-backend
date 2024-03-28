import {
  IsDate,
  IsDateString,
  IsDefined,
  IsNotEmpty, IsOptional,
  IsString
} from "class-validator";
import { ScheduleStatus } from '../schedule-status.enum';
import { Type } from 'class-transformer';
import { Service } from '../../../database/src/typeorm/entities/service.entity';
import { Pet } from '../../../database/src/typeorm/entities/pet.entity';

export class CreateScheduleDto {
  @IsString()
  @IsOptional()
  status: ScheduleStatus;

  @IsDateString()
  @IsNotEmpty({ message: 'A data de início é obrigatória' })
  start_date: Date;

  @IsDate()
  @IsNotEmpty({ message: 'A data de fim é obrigatória' })
  end_date: Date;

  @Type(() => Service)
  @IsDefined({ message: 'O serviço é obrigatório' })
  service: Service;

  @Type(() => Pet)
  @IsDefined({ message: 'O pet é obrigatório' })
  pet: Pet;
}
