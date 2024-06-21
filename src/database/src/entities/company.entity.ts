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
import type { User } from './User.entity';
import { Schedule } from './schedules.entity';

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

  @Column('character varying', {
    name: 'status',
    default: () => `${Status.TRIAL}`,
  })
  status: Status;

  @OneToMany<Costumer>('Costumer', (costumer) => costumer.company, {
    persistence: false,
  })
  costumers: Costumer[];

  @OneToMany<User>('User', (User) => User.company, {
    persistence: false,
  })
  User: User[];

  @OneToMany<Pet>('Pet', (pet) => pet.company, { persistence: false })
  pets: Pet[];

  @OneToMany<Schedule>('Schedule', (schedule) => schedule.company, {
    persistence: false,
  })
  schedules: Schedule[];

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

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
