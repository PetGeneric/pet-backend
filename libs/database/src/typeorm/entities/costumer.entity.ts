import { Company } from 'libs/database/src/typeorm/entities/company.entity';
import { Pet } from 'libs/database/src/typeorm/entities/pet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('costumer_pk', ['id'], { unique: true })
@Index('costumer_email_uindex', ['email'], { unique: true })
@Entity('costumer')
export class Costumer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: string;

  @Column({ type: 'character varying', length: 255 })
  name: string;

  @Column({ type: 'character varying', length: 255 })
  phone: string;

  @Column({ type: 'character varying', length: 255 })
  email: string;

  @ManyToOne(() => Company, (company) => company.costumers)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @Column()
  company_id: string;

  @ManyToMany(() => Pet, (pet) => pet.tutor)
  pets: Pet[];

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable:true })
   deletedAt: Date | null;
}
