import { Costumer } from "src/client/costumer/entities/costumer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @OneToMany(() => Costumer, costumer => costumer.company)
    employees: Costumer[];

    @OneToMany(() => Costumer, costumer => costumer.company)
    costumers: Costumer[];

    @Column
    createdAt: Date;

    @Column()
    updatedAt: Date;


}
