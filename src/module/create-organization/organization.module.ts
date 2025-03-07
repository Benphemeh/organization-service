import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';

import { organizationProviders } from './organization.provider';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationService } from './organization.service';
import { AdminService } from '../admin/admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION || '24h' },
    }),
  ],
  controllers: [OrganizationController],
  providers: [...organizationProviders, AdminService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
