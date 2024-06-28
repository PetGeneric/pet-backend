import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../../database/src/entities/schedules.entity';
import { DeepPartial, Equal, Repository } from 'typeorm';
import { User } from 'src/database/src/entities/user.entity';
import { PetHistoryService } from '../pet-history/pet-history.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private readonly historyService: PetHistoryService,
  ) {}
  async create(data: DeepPartial<Schedule>, user: User) {
    return await this.scheduleRepository.manager.transaction(
      async (manager) => {
        const schedule = this.scheduleRepository.create(data);
        schedule.company = user.company;

        const savedSchedule = await manager.save(schedule);

        await this.historyService.create(
          {
            pet: savedSchedule.pet,
            service: savedSchedule.service,
            company: savedSchedule.company,
            schedule: savedSchedule,
          },
          manager,
        );

        return savedSchedule;
      },
    );
  }

  async findAll(user: User) {
    return await this.scheduleRepository.find({
      where: {
        companyId: Equal(user.company.id),
      },
      relations: {
        pet: true,
        service: true,
      },
    });
  }

  async findOne(id: string, user: User) {
    return await this.scheduleRepository.findOne({
      where: {
        id: Equal(id),
        companyId: Equal(user.company.id),
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
