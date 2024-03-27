import type { Schedule } from 'libs/database/src/typeorm/entities/schedules.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn, JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Index('service_pk', ['id'], { unique: true })
@Index('service_id_uindex', ['id'], { unique: true })
@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'character varying', length: 255 })
  name: string;

  @Column({ type: 'character varying', length: 255 })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToMany<Schedule>('Schedule', (schedule) => schedule.service)
  @JoinTable({
    name: 'scheduled_services',
    joinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'schedule_id',
      referencedColumnName: 'id',
    },
  })
  schedules: Schedule[];

  @CreateDateColumn({ name: 'created_at', default: () => 'now()'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at',onUpdate:'CURRENT TIMESTAMP', nullable: true})
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;
}
