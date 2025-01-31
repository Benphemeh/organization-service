import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateOrganizationDto } from '../create-organization/DTO/create-organization.dto';
import { UpdateOrganizationDto } from '../create-organization/DTO/update-organization.dto';
import { AdminGuard } from 'src/core/guards/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('organizations')
  async getAllOrganizations() {
    return await this.adminService.findAllOrganizations();
  }
  @UseGuards(AdminGuard)
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
  @Patch('organizations/:id')
  async updateOrganization(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return await this.adminService.updateOrganization(
      id,
      updateOrganizationDto,
    );
  }
  @Delete('organizations/:id')
  async deleteOrganization(@Param('id') id: string) {
    return await this.adminService.deleteOrganization(id);
  }
}
