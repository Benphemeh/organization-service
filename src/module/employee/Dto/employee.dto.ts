import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class EmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  gender: 'Male' | 'Female' | 'Other';

  @IsNotEmpty()
  @IsString()
  role: string;
}
