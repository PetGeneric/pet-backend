import {
  Column,
  Entity, Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, RelationId
} from "typeorm";
import type { Users } from './users.entity';
import type { Roles } from './roles.entity';

@Index('user_role_pk', ['id'], { unique: true })
@Entity('user_role_reference')
export class UserRoleReference {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  @RelationId((self: UserRoleReference) => self.user)
  userId: string;

  @Column({ name: 'role_id', type: 'uuid' })
  @RelationId((self: UserRoleReference) => self.roles)
  roleId: string;

  @ManyToOne<Users>('Users', (users) => users.roles)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @ManyToOne<Roles>('Roles', (roles) => roles.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roles: Roles;
}
