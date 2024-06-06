import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Pet } from './pet.entity';
import type { Service } from './service.entity';
import { ScheduleStatus } from '../../../client/schedules/schedule-status.enum';
import type { Company } from './company.entity';

@Index('schedule_pk', ['id'], { unique: true })
@Index('schedule_id_uindex', ['id'], { unique: true })
@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: string;

  @Column('integer', {
    name: 'status',
    default: () => `${ScheduleStatus.PENDING}`,
  })
  status: ScheduleStatus;

  @Column('timestamp', {
    name: 'start_date',
  })
  startDate: Date;

  @Column('timestamp', { name: 'end_date' })
  endDate: Date;

  @ManyToOne<Pet>('Pet', (pet) => pet.schedules)
  @JoinColumn({ name: 'pet_id', referencedColumnName: 'id' })
  pet: Pet;

  @ManyToOne<Company>('Company', (company) => company.schedules)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column('uuid', { name: 'pet_id' })
  petId: string;

  @ManyToOne<Service>('Service', (service) => service.schedules)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service: Service;

  @Column('uuid', { name: 'service_id' })
  serviceId: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
