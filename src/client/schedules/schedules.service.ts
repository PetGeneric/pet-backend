import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../../database/src/entities/schedules.entity';
import { DeepPartial, Equal, Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}
  create(data: DeepPartial<Schedule>) {
    const schedule = this.scheduleRepository.create(data);

    return this.scheduleRepository.save(schedule);
  }

  async findAll() {
    return await this.scheduleRepository.find();
  }

  async findOne(id: string) {
    return await this.scheduleRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
  }

  async update(id: string, data: DeepPartial<Schedule>) {
    const scheduleToUpdate = await this.findOne(id);
    this.scheduleRepository.merge(scheduleToUpdate, data);

    return await this.scheduleRepository.save(scheduleToUpdate);
  }

  async remove(id: string) {
    const scheduleToDelete = await this.findOne(id);

    return await this.scheduleRepository.softRemove(scheduleToDelete);
  }
}
