import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';

import { organizationProviders } from './organization.provider';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationService } from './organization.service';
import { AdminService } from '../admin/admin.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [...organizationProviders, AdminService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
