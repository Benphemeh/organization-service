import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { EmployeeDto } from './Dto/employee.dto';

@Injectable()
export class EmployeeService {
  private employees: EmployeeDto[] = [];

  constructor(private readonly _kafka: ProducerService) {}

  async create(@Body() employee: EmployeeDto) {
    console.log('create');
    this._kafka.Produce({
      topic: 'create-employee',
      messages: [{ value: JSON.stringify(employee) }],
    });
  }
  async findOne(id: string) {
    const employee = this.employees.find((emp) => emp.id === Number(id));
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async findAll() {
    console.log('fetch all employees');
    await this._kafka.Produce({
      topic: 'fetch-all-employees',
      messages: [{ value: 'Fetching all employees' }],
    });
    return this.employees;
  }

  async update(@Body() employee: EmployeeDto) {
    console.log('update');
    this._kafka.Produce({
      topic: 'update-employee',
      messages: [{ value: JSON.stringify(employee) }],
    });
  }
}
