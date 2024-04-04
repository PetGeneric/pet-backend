import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from './pet.entity';
import { Schedule } from './schedules.entity';

@Entity('scheduled_pets')
export class ScheduledPets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'schedule_id', type: 'uuid' })
  scheduleId: string;

  @Column({ name: 'pet_id', type: 'uuid' })
  petId: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.pet)
  @JoinColumn({ name: 'schedule_id', referencedColumnName: 'id' })
  schedule: Schedule;

  @ManyToOne(() => Pet, (pet) => pet.schedules)
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
