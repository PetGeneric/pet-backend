import { Injectable } from '@nestjs/common';
import { CreatePetHistoryDto } from './dto/create-pet-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Equal, Repository } from 'typeorm';
import { User } from 'src/database/src/entities/User.entity';
import { PetHistory } from 'src/database/src/entities/pet-history.entity';

@Injectable()
export class PetHistoryService {
  constructor(
    @InjectRepository(PetHistory)
    private readonly historyRepository: Repository<PetHistory>,
  ) {}
  async create(
    createHistoryDto: CreatePetHistoryDto,
    manager: EntityManager,
  ): Promise<PetHistory> {
    const history = manager.create(PetHistory, createHistoryDto);

    return await manager.save(PetHistory, history);
  }

  async findAll(user: User): Promise<PetHistory[]> {
    return await this.historyRepository.find({
      where: {
        company: {
          id: Equal(user.company.id),
        }
      },
      relations: {
        pet: true,
        company: true,
        service: true,
        schedule: true,
      },
    });
  }
}
