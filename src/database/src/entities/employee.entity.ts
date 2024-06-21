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
import { User } from './user.entity';

@Index('employee_pk', ['id'], { unique: true })
@Index('employee_id_uindex', ['id'], { unique: true })
@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'character varying', name: 'first_name', length: 255 })
  first_name: string;

  @Column({
    type: 'character varying',
    name: 'last_name',
    nullable: true,
    length: 255,
  })
  last_name: string;

  @ManyToOne<User>('User', (User) => User.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: string;

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
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;
}
