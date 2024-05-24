import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Company } from '../../../database/src/entities/company.entity';
import { Pet } from '../../../database/src/entities/pet.entity';

export class CreateCostumerDto {
  @IsString({ message: 'Nome inválido' })
  name: string;

  @IsString()
  phone: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsDefined({ message: 'Selecione uma empresa' })
  @Type(() => Company)
  company: Company;

  @IsOptional()
  @Type(() => Pet)
  pets: Pet[];
}
