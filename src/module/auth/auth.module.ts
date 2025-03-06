import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { modelInstances } from 'src/core/model-instances';
import { LocalStrategy } from './local.strategy';
import { OrganizationModule } from '../create-organization/organization.module';
import { OrganizationService } from '../create-organization/organization.service';
import { OrganizationController } from '../create-organization/organization.controller';

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
    OrganizationService,
    LocalStrategy,
    JwtStrategy,
    ...modelInstances,
  ],
  controllers: [OrganizationController],
})
export class AuthModule {}
