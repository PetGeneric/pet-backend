import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsNumber()
  phone: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;
}
