import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateOrganizationDto } from '../create-organization/DTO/create-organization..dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('organizations')
  async getAllOrganizations() {
    return await this.adminService.findAllOrganizations();
  }

  @Get('organizations/:id')
  async getOrganizationById(@Param('id') id: string) {
    return await this.adminService.findOrganizationById(id);
  }

  @Post('organizations')
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    return await this.adminService.createOrganization(createOrganizationDto);
  }
}
