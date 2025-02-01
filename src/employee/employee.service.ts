import { Body, Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { EmployeeDto } from './Dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly _kafka: ProducerService) {}

  async create(@Body() employee: EmployeeDto) {
    console.log('create');
    this._kafka.Produce({
      topic: 'create-employee',
      messages: [{ value: JSON.stringify(employee) }],
    });
  }

  async update(@Body() employee: EmployeeDto) {
    console.log('update');
    this._kafka.Produce({
      topic: 'update-employee',
      messages: [{ value: JSON.stringify(employee) }],
    });
  }
}
