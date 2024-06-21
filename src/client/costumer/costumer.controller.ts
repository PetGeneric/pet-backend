import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { User } from 'src/database/src/entities/user.entity';

@Controller('client/costumer')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Post()
  create(@Body() createCostumerDto: CreateCostumerDto) {
    return this.costumerService.create(createCostumerDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.costumerService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.costumerService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
    @CurrentUser() user: User,
  ) {
    return this.costumerService.update(id, updateCostumerDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.costumerService.remove(id, user);
  }
}
