import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Costumer } from '../../database/src/entities/costumer.entity';
import { DeepPartial, Equal, Repository } from 'typeorm';

@Injectable()
export class CostumerService {
  constructor(
    @InjectRepository(Costumer)
    private costumerRepository: Repository<Costumer>,
  ) {}

  create(data: DeepPartial<Costumer>) {
    const costumer = this.costumerRepository.create(data);
    return this.costumerRepository.save(costumer);
  }

  async findAll(): Promise<Costumer[]> {
    return await this.costumerRepository.find();
  }

  async findOne(id: string) {
    return await this.costumerRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
  }

  async update(id: string, data: DeepPartial<Costumer>) {
    const costumerToUpdate = await this.findOne(id);
    this.costumerRepository.merge(costumerToUpdate, data);

    return await this.costumerRepository.save(costumerToUpdate);
  }

  async remove(id: string) {
    const costumerToDelete = await this.findOne(id);

    return await this.costumerRepository.softRemove(costumerToDelete);
  }
}
