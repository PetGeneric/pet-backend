import { Module } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CostumerController } from './costumer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costumer } from '../../database/src/entities/costumer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Costumer])],
  controllers: [CostumerController],
  providers: [CostumerService],
})
export class CostumerModule {}
