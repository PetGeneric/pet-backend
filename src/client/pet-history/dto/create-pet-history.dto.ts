import { Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { Company } from 'src/database/src/entities/company.entity';
import { Pet } from 'src/database/src/entities/pet.entity';
import { Schedule } from 'src/database/src/entities/schedules.entity';
import { Service } from 'src/database/src/entities/service.entity';

export class CreatePetHistoryDto {
  @Type(() => Pet)
  @IsDefined({ message: 'É necessário ter um pet para criar o histório' })
  pet: Pet;

  @Type(() => Service)
  @IsDefined({ message: 'É necessário ter um serviço para criar o histório' })
  service: Service;

  @Type(() => Company)
  @IsDefined({ message: 'É necessário ter uma empresa para criar o histório' })
  company: Company;

  @Type(() => Schedule)
  @IsDefined({
    message: 'É necessário ter um agendamento para criar o histório',
  })
  schedule: Schedule;
}
