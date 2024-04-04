import { IsEmail, IsString } from "class-validator";

export class CreateAuthDto {

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Senha não informada' })
  password: string;
}
