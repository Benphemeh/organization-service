import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REPOSITORY } from 'src/core/constants';
import { Organization } from 'src/database';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(REPOSITORY.ORGANIZATION) private userRepo: typeof Organization,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepo.findOne({ where: { id: payload.id } });
    if (!user) {
      throw new UnauthorizedException('unauthorized');
    }
    return payload;
  }
}
