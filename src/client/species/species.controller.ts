import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { SpeciesService } from './species.service';
import { CreateSpecieDto } from "./dto/create-specie.dto";
import { UpdateSpecieDto } from "./dto/update-specie.dto";

@Controller('client/species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {
  }

  @Post()
  create(@Body() createServiceDto: CreateSpecieDto) {
    return this.speciesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateSpecieDto) {
    return this.speciesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(id);
  }
}
