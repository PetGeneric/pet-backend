import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateCostumerDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsDefined({ message: 'Selecione uma empresa' })
  company_id: string;
}
