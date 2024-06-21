import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from '../../database/src/entities/specie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
