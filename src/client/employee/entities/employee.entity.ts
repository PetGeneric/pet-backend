import { Company } from "src/client/company/entities/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column()
    roleId: string;

    @Column()
    companyId: string;

    @ManyToOne(() => Company, company => company.employees)
    company: Company;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
