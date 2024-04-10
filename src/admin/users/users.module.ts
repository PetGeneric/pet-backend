import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../database/src/typeorm/entities/users.entity";
import { UserRoleReference } from "../../database/src/typeorm/entities/user-role-reference.entity";
import { Roles } from "../../database/src/typeorm/entities/roles.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Users, UserRoleReference, Roles])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
