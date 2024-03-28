import { IsDefined, IsEmail, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Company } from "../../../database/src/typeorm/entities/company.entity";

export class CreateEmployeeDto {
  @IsString({ message: 'Nome inválido'})
  first_name: string;

  @IsOptional()
  @IsString({ message: 'Sobrenome inválido'})
  last_name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString({ message: 'Senha inválida' })
  password: string;

  @Type(() => Company)
  @IsDefined({ message: 'Selecione uma empresa' })
  company: Company;

  @IsDefined({ message: 'Selecione um perfil' })
  roleId: string;
}
