import {  IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
  @IsString({ message: 'O serviço deve ter um nome' })
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumberString(
    { no_symbols: true },
    { message: 'O preço deve ser um número' },
  )
  price: string;
}
