import type { Pet } from 'libs/database/src/typeorm/entities/pet.entity';
import { Service } from 'libs/database/src/typeorm/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ScheduleStatus } from '../../../../../src/client/schedules/schedule-status.enum';

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
  start_date: Date;

  @Column('timestamp', { name: 'end_date' })
  end_date: Date;

  @ManyToMany(() => Service, (service) => service.schedules)
  @JoinTable({
    name:'scheduled_services',
    joinColumn: {
      name: 'schedule_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
    },
  })
  service: Service[];

  @ManyToMany<Pet>('Pet', (pet) => pet.schedules)
  @JoinTable({
    name: 'scheduled_pets',
    joinColumn: {
      name: 'schedule_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pet_id',
      referencedColumnName: 'id',
    },
  })
  pets: Pet[];

  @CreateDateColumn({ name: 'created_at', default: () => 'now()'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true})
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
