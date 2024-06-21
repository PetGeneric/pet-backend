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
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import type { Company } from './company.entity';
import type { Roles } from './roles.entity';

@Index('users_pkey', ['id'], { unique: true })
@Index('users_email_key', ['email'], { unique: true })
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'email' })
  email: string;

  @Column('character varying', { name: 'password' })
  password: string;

  @Column({ name: 'company_id' })
  @RelationId((self: User) => self.company)
  companyId: string;

  @ManyToMany<Roles>('Roles', (roles) => roles.user)
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

  @ManyToOne<Company>('Company', (company) => company.User, {
    persistence: false,
  })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

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
