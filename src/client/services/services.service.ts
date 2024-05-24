import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from '../../database/src/entities/service.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}
  create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);

    return this.serviceRepository.save(service);
  }

  async findAll() {
    return await this.serviceRepository.find();
  }

  async findOne(id: string) {
    return await this.serviceRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const serviceToUpdate = await this.findOne(id);

    this.serviceRepository.merge(serviceToUpdate, updateServiceDto);

    return await this.serviceRepository.save(serviceToUpdate);
  }

  async remove(id: string) {
    const serviceToRemove = await this.findOne(id);

    return await this.serviceRepository.softRemove(serviceToRemove);
  }
}
