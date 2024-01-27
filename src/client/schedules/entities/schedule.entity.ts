import { Pet } from 'src/client/pets/entities/pet.entity';
import { Service } from 'src/client/services/entities/service.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamp' })
  data: Date;

  @ManyToMany(() => Service, (service) => service.schedules)
  service: Service;

  @Column()
  serviceId: string;

  @Column()
  petId: string;

  @ManyToMany(() => Pet)
  @JoinTable()
  pets: Pet[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
