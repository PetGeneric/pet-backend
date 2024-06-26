import {
  ArrayMinSize,
  ArrayUnique,
  IsDefined,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Company } from '../../../database/src/entities/company.entity';
import { Roles } from '../../../database/src/entities/roles.entity';

export class CreateUserDto {
  @IsString({ message: 'O campo nome não pode ser vazio' })
  name: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'O campo senha não pode ser vazio' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve conter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial',
    },
  )
  password: string;

  @IsDefined({ message: 'Deve ser informado ao menos um perfil' })
  @ArrayMinSize(1, { message: 'Selecione pelo menos um perfil' })
  @ArrayUnique((value: Roles) => value.id, {
    message: 'Perfil já selecionado',
  })
  roles: Roles[];

  @Type(() => Company)
  company: Company;
}
