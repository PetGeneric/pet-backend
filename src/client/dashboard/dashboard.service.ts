import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Costumer } from 'src/database/src/entities/costumer.entity';
import { Pet } from 'src/database/src/entities/pet.entity';
import { Schedule } from 'src/database/src/entities/schedules.entity';
import { Repository } from 'typeorm';
import { DashboardData } from './interface/dashboard-data.interface';
import { User } from 'src/database/src/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Costumer)
    private readonly costumerRepository: Repository<Costumer>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async getDashboardData(user: User): Promise<DashboardData> {
    const totalCostumers = await this.costumerRepository.count({
      where: { companyId: user.companyId },
    });
    const totalPets = await this.petRepository.count({
      where: { companyId: user.companyId },
    });
    const totalSchedules = await this.scheduleRepository.count({
      where: { companyId: user.companyId },
    });
    return {
      totalCostumers,
      totalPets,
      totalSchedules,
    };
  }
}
