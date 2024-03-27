import { Status } from 'core/status.enum';
import { Costumer } from 'libs/database/src/typeorm/entities/costumer.entity';
import { Pet } from 'libs/database/src/typeorm/entities/pet.entity';
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

@Index('company_pk', ['id'], { unique: true })
@Index('company_id_uindex', ['id'], { unique: true })
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

  @OneToMany(() => Costumer, (costumer) => costumer.company)
  employees: Costumer[];

  @OneToMany(() => Costumer, (costumer) => costumer.company)
  costumers: Costumer[];

  @OneToMany(() => Pet, (pet) => pet.company)
  pets: Pet[];

  @Column('integer', { name: 'status', default: () => `${Status.TRIAL}` })
  status: Status;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  readonly deletedAt: Date | null;
}
