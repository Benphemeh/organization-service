import { IsOptional, IsString } from 'class-validator';

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  industry?: string;
}
