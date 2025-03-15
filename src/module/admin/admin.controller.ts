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
import { CreateOrganizationDto } from '../create-organization/dto/create-organization.dto';
import { UpdateOrganizationDto } from '../create-organization/dto/update-organization.dto';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(DoesUserExist)
  @Post('organizations')
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    return await this.adminService.createOrganization(createOrganizationDto);
  }

  @Get()
  async getAllOrganizations() {
    return await this.adminService.findAllOrganizations();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(`Request for organization with id: ${id}`);
    if (!id) {
      throw new BadRequestException('Organization ID is required');
    }
    return this.adminService.findOrganizationById(id);
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
