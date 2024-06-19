import { Injectable } from '@nestjs/common';
import { CreatePetHistoryDto } from './dto/create-pet-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { User } from 'src/database/src/entities/User.entity';
import { PetHistory } from 'src/database/src/entities/pet-history.entity';

@Injectable()
export class PetHistoryService {
  constructor(
    @InjectRepository(PetHistory)
    private readonly historyRepository: Repository<PetHistory>,
  ) {}
  async create(createHistoryDto: CreatePetHistoryDto): Promise<PetHistory> {
    const history = this.historyRepository.create(createHistoryDto);

    return await this.historyRepository.save(history);
  }

  async findAll(user: User): Promise<PetHistory[]> {
    return await this.historyRepository.find({
      where: {
        companyId: Equal(user.companyId),
      },
    });
  }
}
