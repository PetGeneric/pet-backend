import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Pet } from "../../database/src/typeorm/entities/pet.entity";
import { DeepPartial, EntityManager, Equal, Repository } from "typeorm";
import { Costumer } from "../../database/src/typeorm/entities/costumer.entity";
import { CostumerPets } from "../../database/src/typeorm/entities/costumers-pets.entity";

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>
  ) {
  }
  create(data: DeepPartial<Pet>) {
    const pet = this.petRepository.create(data);

    return this.petRepository.manager.transaction(async (manager) => {
      await manager.save(pet);

      await this.createOrUpdateTutors(pet, data.tutor, manager);

      return pet;
    })
  }

  async findAll() {
    return await this.petRepository.find();
  }

  async findOne(id: string) {
    return await this.petRepository.findOne({
      where:{
        id: Equal(id)
      }
    })
  }

  async update(id: string, data: DeepPartial<Pet>) {
    const petToUpdate = await this.findOne(id);
    this.petRepository.merge(petToUpdate, data);

    return await this.petRepository.save(petToUpdate);
  }

  async remove(id: string) {
    const petToDelete = await this.findOne(id);

    return await this.petRepository.softRemove(petToDelete);
  }

  async createOrUpdateTutors(
    pet: Pet,
    tutors: DeepPartial<Costumer[]>,
    manager: EntityManager) {

    const costumerPets: CostumerPets[] = [];

    const existingTutors = await manager.find(
      CostumerPets,
      {
        where: {
          petId: pet.id
        },
    })

    const tutorsToRemove = existingTutors.filter((tutor) => {
      return !tutors.some((newTutor) => newTutor.id === tutor.costumerId);
    })

    await manager.remove(tutorsToRemove);

    for (const tutor of tutors) {
      const pivotToCreate = manager.create(CostumerPets, {
        petId: pet.id,
        costumerId: tutor.id
      });

      costumerPets.push(pivotToCreate);
    }

    return await manager.save(costumerPets);

  }

}
