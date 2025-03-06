import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';

import { organizationProviders } from './organization.provider';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationService } from './organization.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [...organizationProviders],
  exports: [OrganizationService],
})
export class OrganizationModule {}
