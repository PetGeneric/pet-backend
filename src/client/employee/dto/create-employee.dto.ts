import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsDefined({ message: 'Selecione uma empresa' })
  company_id: string;

  @IsDefined({ message: 'Selecione um perfil' })
  roleId: string;
}
