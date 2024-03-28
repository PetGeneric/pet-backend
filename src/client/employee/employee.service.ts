import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "../../database/src/typeorm/entities/employee.entity";
import { DeepPartial, Equal, Repository } from "typeorm";

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {
  }
  create(data:DeepPartial<Employee>) {
    const employee = this.employeeRepository.create(data);
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: string) {
    return await this.employeeRepository.findOne({
      where: {
        id: Equal(id)
      }
    })
  }

  async update(id: string, data: DeepPartial<Employee>) {
    const employeeToUpdate = await this.findOne(id);
    this.employeeRepository.merge(employeeToUpdate, data);

    return await this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: string) {
    const employeeToDelete = await this.findOne(id);

    return await this.employeeRepository.softRemove(employeeToDelete);
  }
}
