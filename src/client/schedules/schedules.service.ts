import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../../database/src/entities/schedules.entity';
import { DeepPartial, Equal, Repository } from 'typeorm';
import { User } from 'src/database/src/entities/user.entity';
import { PetHistory } from 'src/database/src/entities/pet-history.entity';
import { PetHistoryService } from '../pet-history/pet-history.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private readonly historyService: PetHistoryService,
  ) {}
  create(data: DeepPartial<Schedule>) {
    const schedule = this.scheduleRepository.create(data);

    this.historyService.create({
      pet: schedule.pet,
      service: schedule.service,
      company: schedule.company,
      schedule: schedule,
    });

    return this.scheduleRepository.save(schedule);
  }

  async findAll(user: User) {
    return await this.scheduleRepository.find({
      where: {
        companyId: Equal(user.companyId),
      },
    });
  }

  async findOne(id: string, user: User) {
    return await this.scheduleRepository.findOne({
      where: {
        id: Equal(id),
        companyId: Equal(user.companyId),
      },
    });
  }

  async update(id: string, data: DeepPartial<Schedule>, user: User) {
    const scheduleToUpdate = await this.findOne(id, user);
    this.scheduleRepository.merge(scheduleToUpdate, data);

    return await this.scheduleRepository.save(scheduleToUpdate);
  }

  async remove(id: string, user: User) {
    const scheduleToDelete = await this.findOne(id, user);

    return await this.scheduleRepository.softRemove(scheduleToDelete);
  }
}
