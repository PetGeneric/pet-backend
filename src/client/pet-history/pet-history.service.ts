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
    private readonly entityManager: EntityManager,
  ) {}
  async create(createHistoryDto: CreatePetHistoryDto): Promise<PetHistory> {
    const history = this.historyRepository.create(createHistoryDto);

    return await this.historyRepository.save(history);
  }

  async findAll(user: User): Promise<PetHistory[]> {
    return await this.findAllHistories(user)
  }

  async findAllHistories(user: User): Promise<PetHistory[]> {
    const qb = this.entityManager.createQueryBuilder(PetHistory, 'history');
    qb.leftJoinAndSelect('history.pet', 'pet');
    qb.leftJoinAndSelect('history.company', 'company');
    qb.leftJoinAndSelect('history.service', 'service');
    qb.leftJoinAndSelect('history.schedule', 'schedule');
    qb.where('company.id = :companyId', { companyId: user.company.id });
    return await qb.getMany();
  }
}
