import { Costumer } from "src/client/costumer/entities/costumer.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pet {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;

    @ManyToMany(() => Costumer, costumer => costumer.pets)
    tutor: Costumer[];

    @Column()
    tutorId: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
