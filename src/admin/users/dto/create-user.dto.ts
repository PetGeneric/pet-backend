import {  IsEmail, IsString, IsStrongPassword, minLength } from "class-validator";
import { Type } from "class-transformer";
import { Company } from "../../../database/src/typeorm/entities/company.entity";
import { Roles } from "../../../database/src/typeorm/entities/roles.entity";

export class CreateUserDto {

  @IsString({ message: 'O campo nome não pode ser vazio' })
  name: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'O campo senha não pode ser vazio' })
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: "A senha deve conter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial" })
  password: string;

  @IsString({ message: 'O campo role não pode ser vazio' })
  role: Roles[];

  @Type(() => Company)
  company: Company;
}
