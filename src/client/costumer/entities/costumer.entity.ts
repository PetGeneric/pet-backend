import { Company } from "src/client/company/entities/company.entity";
import { Pet } from "src/client/pets/entities/pet.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Costumer {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @ManyToOne(() => Company, company => company.costumers)
    company: Company;

    @Column()
    companyId: string;

    @ManyToMany(() => Pet, pet => pet.tutor)
    pets: Pet[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;


}
