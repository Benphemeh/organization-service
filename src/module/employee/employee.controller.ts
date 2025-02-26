import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './Dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private _service: EmployeeService) {}
  @Post()
  async create(@Body() employee: EmployeeDto) {
    await this._service.create(employee);
  }

  @Get()
  async findAll() {
    return await this._service.findAll();
  }
  @Put()
  async update(@Body() employee: EmployeeDto) {
    await this._service.update(employee);
  }
}
