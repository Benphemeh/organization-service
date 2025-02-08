import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmployeeDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  age: number;
}
