import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { modelInstances } from 'src/core/model-instances';
import { OrganizationModule } from '../create-organization/organization.module';
import { OrganizationController } from '../create-organization/organization.controller';

@Module({
  imports: [
    OrganizationModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION || '24h' },
    }),
  ],
  controllers: [AdminController, OrganizationController],
  providers: [AdminService, ...modelInstances],
  exports: [JwtModule],
})
export class AdminModule {}
