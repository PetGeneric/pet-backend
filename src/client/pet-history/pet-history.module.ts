import { Module } from '@nestjs/common';
import { PetHistoryService } from './pet-history.service';
import { PetHistoryController } from './pet-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetHistory } from 'src/database/src/entities/pet-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetHistory])],
  controllers: [PetHistoryController],
  providers: [PetHistoryService],
  exports: [PetHistoryService],
})
export class PetHistoryModule {}
