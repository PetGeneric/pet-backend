import { Injectable } from '@nestjs/common';
import { Species } from '../../database/src/entities/specie.entity';
import { DeepPartial, Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly repository: Repository<Species>,
  ) {}

  async create(data: DeepPartial<Species>): Promise<Species> {
    const species = this.repository.create(data);

    return await this.repository.save(species);
  }

  async findAll(): Promise<Species[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Species> {
    return await this.repository.findOneOrFail({
      where: {
        id: Equal(id),
      },
    });
  }

  async update(id: string, data: DeepPartial<Species>): Promise<Species> {
    const species = await this.findOne(id);

    this.repository.merge(species, data, { id });
    return this.repository.save(species);
  }

  async remove(id: string): Promise<void> {
    const species = await this.findOne(id);

    await this.repository.softRemove(species);
  }
}
