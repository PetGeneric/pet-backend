import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import type { Pet } from "./pet.entity";
import type { Schedule } from "./schedules.entity";


@Index('scheduled_pet_pk', ['id'], { unique: true })
@Entity('scheduled_pets')
export class ScheduledPet {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  id: string;

  @Column({ name: 'pet_id' })
  @RelationId((self: ScheduledPet) => self.pet)
  pet_id: string;

  @Column({ name: 'schedule_id' })
  @RelationId((self: ScheduledPet) => self.schedule)
  schedule_id: string;

  @ManyToOne<Pet>('Pet', (pet) => pet.schedules)
  @JoinColumn({ name: 'pet_id', referencedColumnName: 'id' })
  pet: Pet;

  @ManyToOne<Schedule>('Schedule', (schedule) => schedule.pet)
  @JoinColumn({ name: 'schedule_id', referencedColumnName: 'id' })
  schedule: Schedule;

}
