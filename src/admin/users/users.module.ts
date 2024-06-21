import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/src/entities/user.entity';
import { UserRoleReference } from 'src/database/src/entities/user-role-reference.entity';
import { Roles } from 'src/database/src/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRoleReference, Roles])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
