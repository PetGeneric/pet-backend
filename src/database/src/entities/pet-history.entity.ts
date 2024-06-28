import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import type { Pet } from './pet.entity';
import type { Company } from './company.entity';
import type { Service } from './service.entity';
import type { Schedule } from './schedules.entity';

@Index('pet_history_pk', ['id'], { unique: true })
@Index('pet_history_company_id_index')
@Index('pet_history_service_id_index')
@Index('pet_history_schedule_id_index')
@Entity('pet_history')
export class PetHistory {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'pet_id', type: 'uuid' })
  petId: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'service_id', type: 'uuid' })
  serviceId: string;

  @Column({ name: 'schedule_id', type: 'uuid' })
  scheduleId: string;

  @ManyToOne<Pet>('Pet', (pet) => pet.histories)
  @JoinColumn({ name: 'pet_id', referencedColumnName: 'id' })
  pet: Pet;

  @ManyToOne<Company>('Company', (company) => company)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @ManyToOne<Service>('Service', (service) => service)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  service: Service;

  @ManyToOne<Schedule>('Schedule', (schedule) => schedule)
  @JoinColumn({ name: 'schedule_id', referencedColumnName: 'id' })
  schedule: Schedule;
}
