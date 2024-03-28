import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pet } from "../../database/src/typeorm/entities/pet.entity";
import { CostumerPets } from "../../database/src/typeorm/entities/costumers-pets.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Pet, CostumerPets])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
