import { Status } from 'src/core/status.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Costumer } from './costumer.entity';
import type { Pet } from './pet.entity';
import type { Users } from './users.entity';

@Index('company_pk', ['id'], { unique: true })
@Index('company_name_uindex', ['name'], { unique: true })
@Entity('company')
export class Company {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column({ type: 'character varying', length: 255 })
  phone: string;

  @Column({ type: 'character varying', length: 255 })
  email: string;

  @Column('integer', { name: 'status', default: () => `${Status.TRIAL}` })
  status: Status;

  @OneToMany<Costumer>('Costumer', (costumer) => costumer.company, {
    persistence: false,
  })
  costumers: Costumer[];

  @OneToMany<Users>('Users', (users) => users.company, {
    persistence: false,
  })
  users: Users[];

  @OneToMany<Pet>('Pet', (pet) => pet.company, { persistence: false })
  pets: Pet[];

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    default: 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' , nullable: true})
   deletedAt: Date;
}
