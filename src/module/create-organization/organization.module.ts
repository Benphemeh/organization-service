import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';

import { organizationProviders } from './organization.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [...organizationProviders],
})
export class OrganizationModule {}
