import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/core/status.enum';
import { Company } from 'src/database/src/entities/company.entity';
import { Repository, DeepPartial, Equal } from 'typeorm';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  async create(data: DeepPartial<Company>): Promise<Company> {
    const company = this.companyRepository.create(data);

    company.status = Status.TRIAL;
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: string): Promise<Company> {
    return await this.companyRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
  }

  async update(id: string, data: DeepPartial<Company>) {
    const companyToUpdate = await this.findOne(id);

    this.companyRepository.merge(companyToUpdate, data);

    return await this.companyRepository.save(companyToUpdate);
  }

  async remove(id: string) {
    const companyToDelete = await this.findOne(id);

    return await this.companyRepository.softRemove(companyToDelete);
  }
}
