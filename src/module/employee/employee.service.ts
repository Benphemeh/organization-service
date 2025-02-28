import { Body, Injectable } from '@nestjs/common';
import { ProducerService } from 'src/module/producer/producer.service';
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
  async findAll() {
    console.log('fetch all employees');
    await this._kafka.Produce({
      topic: 'fetch-all-employees',
      messages: [{ value: 'Fetching all employees' }],
    });
    return this.employees;
  }
}
