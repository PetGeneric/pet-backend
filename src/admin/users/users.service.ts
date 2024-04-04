import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../../database/src/typeorm/entities/users.entity";
import { DeepPartial, Equal, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {
  }
  async create(data: DeepPartial<Users>) {
    const user = this.usersRepository.create(data);

    user.password = await bcrypt.hash(user.password, 10);

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: Equal(email)
      }
    })
  }

  async findOne(id: string) {
    return  await this.usersRepository.findOne({
      where: {
        id: Equal(id)
      }
    })
  }

  async update(id: string, data: DeepPartial<Users>) {
    const userToUpdate = await this.findOne(id);

    this.usersRepository.merge(userToUpdate, data);

    return await this.usersRepository.save(userToUpdate);
  }

  async remove(id: string) {
    const userToDelete = await this.findOne(id.toString());

    return await this.usersRepository.softRemove(userToDelete);
  }
}
