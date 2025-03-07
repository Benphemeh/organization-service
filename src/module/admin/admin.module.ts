import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { modelInstances } from 'src/core/model-instances';
import { OrganizationModule } from '../create-organization/organization.module';
import { OrganizationController } from '../create-organization/organization.controller';
@Module({
  imports: [OrganizationModule],
  controllers: [AdminController, OrganizationController],
  providers: [AdminService, ...modelInstances],
})
export class AdminModule {}
