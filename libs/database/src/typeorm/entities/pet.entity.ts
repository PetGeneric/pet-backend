import type { Company } from 'libs/database/src/typeorm/entities/company.entity';
import type { Costumer } from 'libs/database/src/typeorm/entities/costumer.entity';
import type { Species } from 'libs/database/src/typeorm/entities/specie.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn, JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import type { Schedule } from "./schedules.entity";

@Index('pet_pk', ['id'], { unique: true })
@Index('pet_id_uindex', ['id'], { unique: true })
@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn({ name: 'id'})
  id: string;

  @Column({ type: 'character varying', length: 255})
  name: string;

  @Column({ type: 'integer', nullable: true})
  age: number;

  @Column({ type: 'character varying', nullable:true, length: 255})
  breed: string;

  @Column({ type: 'date', nullable: true})
  birthdayDate: Date;

  @ManyToOne('Species')
  @JoinColumn({ name: 'species_id', referencedColumnName: 'id' })
  species: Species;

  @Column({ name: 'species_id'})
  species_id: string;

  @ManyToMany<Costumer>('Costumer', (costumer) => costumer.pets)
  @JoinTable({
   name: 'costumer_pets',
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


  @ManyToMany<Schedule>('Schedule', (schedule) => schedule.pets)
  @JoinTable({
    name: 'scheduled_pets',
    joinColumn: {
      name: 'pet_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'schedule_id',
      referencedColumnName: 'id',
    },
  })
  schedules: Schedule[];

  @ManyToOne<Company>( 'Company', (company) => company.pets)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company[];

  @Column({ name: 'company_id'})
  company_id: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    onUpdate:'CURRENT TIMESTAMP'
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
   deletedAt: Date
}
