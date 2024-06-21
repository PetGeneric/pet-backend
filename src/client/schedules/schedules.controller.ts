import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { User } from 'src/database/src/entities/user.entity';
@Controller('client/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    return this.schedulesService.create(createScheduleDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.schedulesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.schedulesService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @CurrentUser() user: User,
  ) {
    return this.schedulesService.update(id, updateScheduleDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.schedulesService.remove(id, user);
  }
}
