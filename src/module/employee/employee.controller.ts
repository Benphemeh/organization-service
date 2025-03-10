import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeDto } from './Dto/employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Post()
  async create(@Body() employee: EmployeeDto) {
    await this.employeeService.create(employee);
  }

  @Get()
  async findAll() {
    return await this.employeeService.findAll();
  }
}
