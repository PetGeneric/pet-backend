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
import type { Company } from "./company.entity";
import type { Pet } from "./pet.entity";

@Index('costumer_pk', ['id'], { unique: true })
@Index('costumer_email_uindex', ['email'], { unique: true })
@Entity('costumer')
export class Costumer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: string;

  @Column({ type: 'character varying', length: 255 })
  name: string;

  @Column({ type: 'character varying', length: 255 })
  phone: string;

  @Column({ type: 'character varying', length: 255 })
  email: string;

  @ManyToOne<Company>('Company', (company) => company.costumers)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @Column({ name: 'company_id'})
  company_id: string;

  @ManyToMany<Pet>('Pet', (pet) => pet.tutor)
  @JoinTable({
    name: 'costumers_pets',
        joinColumn: {
          name: 'costumer_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'pet_id',
          referencedColumnName: 'id',
        },
  })
  pets: Pet[];

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable:true })
   deletedAt: Date
}
