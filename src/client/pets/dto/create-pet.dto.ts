import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Species } from '../../../database/src/entities/specie.entity';
import { Costumer } from '../../../database/src/entities/costumer.entity';
import { Company } from '../../../database/src/entities/company.entity';

export class CreatePetDto {
  @IsString({ message: 'Defina um nome' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Defina uma raça' })
  breed: string;

  @IsOptional()
  @IsNumber({}, { message: 'Idade inválida' })
  age: number;

  @IsOptional()
  @IsDate()
  birthdayDate: Date;

  @Type(() => Species)
  species: Species;

  @IsDefined({ message: 'Selecione um tutor' })
  @Type(() => Costumer)
  @ValidateNested({ each: true })
  tutor: Costumer[];

  @IsDefined({ message: 'Selecione uma empresa' })
  @Type(() => Company)
  company: Company;
}
