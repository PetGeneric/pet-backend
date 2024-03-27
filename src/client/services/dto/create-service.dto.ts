import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateServiceDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsUUID()
    schedule_id: string;
}
