import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from '../../database/src/entities/pet.entity';
import { CostumerPets } from '../../database/src/entities/costumers-pets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, CostumerPets])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
