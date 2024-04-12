import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put, HttpException, HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../../core/decorators/role-guard.decorator';
import { RolesReference } from '../enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userCreated = await this.usersService.create(createUserDto);
    if (userCreated) {
      return {
        success: true,
        message: 'Usuário criado com sucesso',
      };
    }

    throw new HttpException(
      'Não foi possível criar o seu usuário',
      HttpStatus.BAD_REQUEST,
    );
  }

  @RolesGuard(RolesReference.ADMIN, RolesReference.COMPANY_ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
