import { Body, Controller, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './Dto/employee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private _service: EmployeeService) {}
@Post()
async create(@Body() employee: EmployeeDto) {
    await this._service.create(employee);
}

@Put()
async update(@Body() employee: EmployeeDto) {
    await this._service.update(employee);
}

}
