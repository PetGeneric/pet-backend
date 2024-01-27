import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

export class CreateCompanyDto {
    
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsNumber()
    phone: string;

    @IsEmail()
    email: string;


}
