import {  IsString } from "class-validator";

export class CreateSpecieDto {
  @IsString({ message: 'Defina um nome'})
  name: string;
}
