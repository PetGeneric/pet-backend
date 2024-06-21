import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../database/src/typeorm/entities/users.entity';
import { DeepPartial, EntityManager, Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/database/src/typeorm/entities/roles.entity';
import { UserRoleReference } from 'src/database/src/typeorm/entities/user-role-reference.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(data: DeepPartial<Users>): Promise<Users> {
    return await this.usersRepository.manager.transaction(async (manager) => {
      const user = this.usersRepository.create(data);

      const userExists = await this.findByEmail(user.email);

      if (userExists) {
        throw new BadRequestException('Usuário já cadastrado');
      }

      user.password = await bcrypt.hash(user.password, 10);

      const insertedUser = await manager.insert(Users, user);

      if (data.roles && data.roles.length > 0) {
        await this.createRoleReferences(
          data.roles,
          insertedUser.identifiers[0].id,
          manager,
        );
      } else {
        throw new BadRequestException('Roles not found');
      }

      return await manager.save(Users, user);
    });
  }

  async createRoleReferences(
    roles: DeepPartial<Roles>[],
    userId: string,
    manager: EntityManager,
  ) {
    for (const role of roles) {
      const roleReference = await manager.findOne(Roles, {
        where: {
          id: Equal(role.id),
        },
      });
      if (!roleReference) {
        throw new BadRequestException(`Role ${role.id} not found`);
      }

      const userRoleReference = manager.create(UserRoleReference, {
        userId,
        roleId: role.id,
      });

      await manager.save(userRoleReference);
    }
  }

  async update(
    id: string,
    data: DeepPartial<Users>,
  ): Promise<Users | undefined> {
    return await this.usersRepository.manager.transaction(async (manager) => {
      const userToUpdate = await manager.findOne(Users, {
        where: { id: Equal(id) },
      });

      if (!userToUpdate) {
        throw new BadRequestException('User not found');
      }

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      manager.merge(Users, userToUpdate, data);

      if (data.roles) {
        await this.updateRoles(data.roles, userToUpdate, manager);
      }

      await manager.save(userToUpdate);

      return userToUpdate;
    });
  }

  async updateRoles(
    data: DeepPartial<Roles[]>,
    user: Users,
    manager: EntityManager,
  ) {
    const existingReferences = await manager.find(UserRoleReference, {
      where: {
        userId: Equal(user.id),
      },
    });

    const existingRoleIds = existingReferences.map(
      (reference) => reference.roleId,
    );

    const newDataRoleIds = data.map((role) => role.id);

    for (const roleId of newDataRoleIds) {
      if (!existingRoleIds.includes(roleId)) {
        const newReference = manager.create(UserRoleReference, {
          userId: user.id,
          roleId: roleId,
        });
        await manager.save(newReference);
      }
    }

    for (const reference of existingReferences) {
      if (!newDataRoleIds.includes(reference.roleId)) {
        await manager.remove(reference);
      }
    }
  }

  async findAll() {
    return await this.usersRepository.find({
      relations: ['roles'],
    });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: Equal(email),
      },
      relations: {
        company: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneOrFail({
      where: {
        id: Equal(id),
      },
      relations: ['roles'],
    });
  }

  async gerUserRoles(id: string) {
    return await this.usersRepository.manager.transaction(async (manager) => {
      const user = await manager.findOne(Users, {
        where: {
          id: Equal(id),
        },
        relations: {
          roles: true,
        },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user.roles;
    });
  }

  async remove(id: string) {
    const userToDelete = await this.findOne(id.toString());

    return await this.usersRepository.softRemove(userToDelete);
  }
}
