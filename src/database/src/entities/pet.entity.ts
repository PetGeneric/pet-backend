import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Schedule } from './schedules.entity';
import type { Species } from './specie.entity';
import type { Costumer } from './costumer.entity';
import type { Company } from './company.entity';
import type { PetHistory } from './pet-history.entity';

@Index('pet_pk', ['id'], { unique: true })
@Index('pet_id_uindex', ['id'], { unique: true })
@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'character varying', length: 255 })
  name: string;

  @Column({ name: 'age', type: 'integer', nullable: true })
  age: number;

  @Column({
    name: 'breed',
    type: 'character varying',
    nullable: true,
    length: 255,
  })
  breed: string;

  @Column({ name: 'birthday_date', type: 'timestamp', nullable: true })
  birthdayDate: Date;

  @ManyToOne('Species')
  @JoinColumn({ name: 'species_id', referencedColumnName: 'id' })
  species: Species;

  @Column({ name: 'species_id' })
  species_id: string;

  @ManyToMany<Costumer>('Costumer', (costumer) => costumer.pets)
  @JoinTable({
    name: 'costumers_pets',
    joinColumn: {
      name: 'pet_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'costumer_id',
      referencedColumnName: 'id',
    },
  })
  tutor: Costumer[];

  @OneToMany<Schedule>('Schedule', (schedule) => schedule.pet)
  schedules: Schedule[];

  @ManyToOne<Company>('Company', (company) => company.pets)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @OneToMany<PetHistory>('PetHistory', (history) => history.pet)
  histories: PetHistory[];

  @Column({ name: 'company_id' })
  companyId: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    onUpdate: 'CURRENT TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;
}
