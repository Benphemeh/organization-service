import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrganizationService } from '../create-organization/organization.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly organizationService: OrganizationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.organizationService.validateUser(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return user;
  }
}
