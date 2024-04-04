import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Schedule } from "./schedules.entity";

@Index('service_pk', ['id'], { unique: true })
@Index('service_id_uindex', ['id'], { unique: true })
@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name', type: 'character varying', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'character varying', length: 255 })
  description: string;

  @Column({ name: 'price', type: 'character varying' })
  price: string;

  @OneToMany<Schedule>('Schedule', (schedule) => schedule.service)
  schedules: Schedule[];

  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    onUpdate: 'CURRENT TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
