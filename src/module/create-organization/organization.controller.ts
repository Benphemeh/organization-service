import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { UpdateOrganizationDto } from './DTO/update-organization.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.organizationService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto);
  }
}
