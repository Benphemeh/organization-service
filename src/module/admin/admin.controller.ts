import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateOrganizationDto } from '../create-organization/DTO/create-organization.dto';
import { UpdateOrganizationDto } from '../create-organization/DTO/update-organization.dto';
import { AdminGuard } from 'src/core/guards/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(AdminGuard)
  @Get()
  async getAllOrganizations() {
    return await this.adminService.findAllOrganizations();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(`Request for organization with id: ${id}`);
    // Check if id is undefined or empty
    if (!id) {
      throw new BadRequestException('Organization ID is required');
    }
    return this.adminService.findOrganizationById(id);
  }

  // @UseGuards(DoesUserExist)
  @Post('organizations')
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    return await this.adminService.createOrganization(createOrganizationDto);
  }

  @Patch(':id')
  async updateOrganization(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return await this.adminService.updateOrganization(
      id,
      updateOrganizationDto,
    );
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteOrganization(@Param('id') id: string) {
    return await this.adminService.deleteOrganization(id);
  }
}
