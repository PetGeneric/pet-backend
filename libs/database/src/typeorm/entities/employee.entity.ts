import type { Company } from 'libs/database/src/typeorm/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('employee_pk', ['id'], { unique: true })
@Index('employee_id_uindex', ['id'], { unique: true })
@Index('employee_email_uindex', ['email'], { unique: true })
@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'character varying', name:'first_name', length: 255 })
  first_name: string;

  @Column({ type: 'character varying', name:'last_name', nullable:true, length: 255 })
  last_name: string;

  @Column({ type: 'character varying',name: 'email', length: 255 })
  email: string;

  @Column({ type: 'character varying', name:'password', length: 72 })
  password: string;

  @ManyToOne<Company>('Company',(company) => company.employees)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;
  
  @Column({ name: 'company_id' })
  company_id: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true})
     deletedAt: Date
}
