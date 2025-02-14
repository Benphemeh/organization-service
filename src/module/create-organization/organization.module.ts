import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { modelInstances } from 'src/core/model-instances';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, ...modelInstances],
})
export class OrganizationModule {}
