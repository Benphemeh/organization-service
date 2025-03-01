import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { organizationProviders } from './organization.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [...organizationProviders],
})
export class OrganizationModule {}
