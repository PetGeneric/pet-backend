import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Company } from './company.entity';
import type { Roles } from './roles.entity';

@Index('users_pkey', ['id'], { unique: true })
@Index('users_email_key', ['email'], { unique: true })
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'email' })
  email: string;

  @Column('character varying', { name: 'password' })
  password: string;

  @ManyToMany<Roles>('Roles', (roles) => roles.users)
  @JoinTable({
    name: 'user_role_reference',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Roles[];

  @Column('boolean', { name: 'is_active', default: false })
  isActive: boolean;

  @ManyToOne<Company>('Company', (company) => company.users)
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @Column({ name: 'company_id' })
  companyId: string;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
