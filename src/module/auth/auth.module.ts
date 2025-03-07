import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { modelInstances } from 'src/core/model-instances';
import { OrganizationModule } from '../create-organization/organization.module';
import { OrganizationService } from '../create-organization/organization.service';
import { OrganizationController } from '../create-organization/organization.controller';
import { LocalStrategy } from './local.strategy';
import { AdminService } from '../admin/admin.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    OrganizationModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    OrganizationService,
    LocalStrategy,
    JwtStrategy,
    ...modelInstances,
    AdminService,
  ],
  controllers: [OrganizationController],
})
export class AuthModule {}
