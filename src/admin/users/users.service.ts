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

      if (!data.roles || data.roles.length === 0) {
        throw new Error('User must have at least one role.');
      }

      const existingRoles = await manager
        .createQueryBuilder(Users, 'user')
        .leftJoinAndSelect('user.roles', 'role')
        .where('role.roleReference IN (:...roles)', {
          roles: data.roles.map((r) => r.roleReference),
        })
        .getMany();

      user.roles = existingRoles.flatMap((user) => user.roles);

      const savedUser = await manager.save(user);

      if (data.roles) {
        await this.createRoleReferences(data.roles, savedUser.id, manager);
      }

      return savedUser;
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
        throw new BadRequestException(`Role ${role} not found`);
      }

      const userRoleReference = manager.create(UserRoleReference, {
        userId,
        roleId: roleReference.id,
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
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({
      where: {
        id: Equal(id),
      },
      relations: ['roles'],
    });
  }

  async remove(id: string) {
    const userToDelete = await this.findOne(id.toString());

    return await this.usersRepository.softRemove(userToDelete);
  }
}
