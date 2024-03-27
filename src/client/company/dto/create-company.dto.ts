import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsString({  message: 'A empresa deve ter um nome'})
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  phone: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;
}
