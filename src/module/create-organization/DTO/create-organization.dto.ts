import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  industry: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
