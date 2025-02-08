import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty({ message: 'First name is required.' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required.' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Age is required.' })
  @IsNumber({}, { message: 'Age must be a valid number.' })
  age: number;

  @IsNotEmpty({ message: 'Address is required.' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: 'Industry is required.' })
  @IsString()
  industry: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsString()
  phoneNumber: string;
}
