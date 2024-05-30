import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import type { Costumer } from './costumer.entity';
import type { Pet } from './pet.entity';

@Index('costumers_pets_pk', ['id'], { unique: true })
@Entity('costumers_pets')
export class CostumerPets {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'costumer_id', type: 'uuid' })
  @RelationId((self: CostumerPets) => self.costumer)
  costumerId: string;

  @Column({ name: 'pet_id', type: 'uuid' })
  @RelationId((self: CostumerPets) => self.pet)
  petId: string;

  @ManyToOne<Costumer>('Costumer', (costumer) => costumer.pets)
  @JoinColumn({ name: 'costumer_id', referencedColumnName: 'id' })
  costumer: Costumer;

  @ManyToOne<Pet>('Pet', (pet) => pet.tutor)
  @JoinColumn({ name: 'pet_id', referencedColumnName: 'id' })
  pet: Pet;

  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
