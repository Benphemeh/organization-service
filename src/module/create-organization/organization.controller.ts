import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationService } from './organization.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }
  //   @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.organizationService.findAll();
  }
}
