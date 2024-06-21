import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Costumer } from '../../database/src/entities/costumer.entity';
import { DeepPartial, Equal, Repository } from 'typeorm';
import { User } from 'src/database/src/entities/user.entity';

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

  async findAll(user: User): Promise<Costumer[]> {
    return await this.costumerRepository.find({
      where: {
        companyId: Equal(user.company.id),
      },
    });
  }

  async findOne(id: string, user: User) {
    return await this.costumerRepository.findOne({
      where: {
        id: Equal(id),
        companyId: Equal(user.company.id),
      },
    });
  }

  async update(id: string, data: DeepPartial<Costumer>, user: User) {
    const costumerToUpdate = await this.findOne(id, user);
    this.costumerRepository.merge(costumerToUpdate, data);

    return await this.costumerRepository.save(costumerToUpdate);
  }

  async remove(id: string, user: User) {
    const costumerToDelete = await this.findOne(id, user);

    return await this.costumerRepository.softRemove(costumerToDelete);
  }
}
