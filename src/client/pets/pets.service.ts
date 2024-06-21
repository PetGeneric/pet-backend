import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from '../../database/src/entities/pet.entity';
import { DeepPartial, EntityManager, Equal, Repository } from 'typeorm';
import { Costumer } from '../../database/src/entities/costumer.entity';
import { CostumerPets } from '../../database/src/entities/costumers-pets.entity';
import { User } from 'src/database/src/entities/user.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}
  create(data: DeepPartial<Pet>) {
    const pet = this.petRepository.create(data);

    return this.petRepository.manager.transaction(async (manager) => {
      await manager.save(pet);

      await this.createOrUpdateTutors(pet, data.tutor, manager);

      return pet;
    });
  }

  async findAll(user: User) {
    return await this.petRepository.find({
      where: {
        companyId: Equal(user.company.id),
      },
    });
  }

  async findOne(id: string, user: User) {
    return await this.petRepository.findOne({
      where: {
        id: Equal(id),
        companyId: Equal(user.company.id),
      },
    });
  }

  async update(id: string, data: DeepPartial<Pet>, user: User) {
    const petToUpdate = await this.findOne(id, user);
    this.petRepository.merge(petToUpdate, data);

    return await this.petRepository.save(petToUpdate);
  }

  async remove(id: string, user: User) {
    const petToDelete = await this.findOne(id, user);

    return await this.petRepository.softRemove(petToDelete);
  }

  async createOrUpdateTutors(
    pet: Pet,
    tutors: DeepPartial<Costumer[]>,
    manager: EntityManager,
  ) {
    const costumerPets: CostumerPets[] = [];

    const existingTutors = await manager.find(CostumerPets, {
      where: {
        petId: pet.id,
      },
    });

    const tutorsToRemove = existingTutors.filter((tutor) => {
      return !tutors.some((newTutor) => newTutor.id === tutor.costumerId);
    });

    await manager.remove(tutorsToRemove);

    for (const tutor of tutors) {
      const pivotToCreate = manager.create(CostumerPets, {
        petId: pet.id,
        costumerId: tutor.id,
      });

      costumerPets.push(pivotToCreate);
    }

    return await manager.save(costumerPets);
  }
}
