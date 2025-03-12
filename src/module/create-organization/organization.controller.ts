import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/core/guards/admin.guard';

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
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }
}
