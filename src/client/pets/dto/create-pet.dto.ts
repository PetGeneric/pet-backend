import { IsDate, IsDefined, IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsDefined({ message: 'Defina uma espécie' })
  species_id: string;

  @IsNumber()
  age: number;

  @IsDefined({ message: 'Defina um tutor' })
  tutor_id: string;

  @IsDefined({ message: 'Defina uma empresa' })
  company_id: string;

  @IsDate()
  birthdayDate?: Date;
}
