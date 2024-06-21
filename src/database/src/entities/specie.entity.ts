import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('species')
export class Species {
  @PrimaryGeneratedColumn('uuid',{  name: 'id' })
  id: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true})
  deletedAt: Date
}
