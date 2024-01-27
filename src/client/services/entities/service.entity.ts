import { Schedule } from "src/client/schedules/entities/schedule.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToMany(() => Schedule, schedule => schedule.service)
    schedules: Schedule[];

    @Column()
    scheduleId: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;


}
