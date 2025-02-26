import { IsString, IsEmail } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsString()
  industry: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;
}
