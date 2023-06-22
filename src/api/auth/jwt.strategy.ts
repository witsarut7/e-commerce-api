import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IJwtUserDecorator } from 'src/shared/jwt.decorator';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(
    payload: IJwtUserDecorator,
    done: VerifiedCallback,
  ): Promise<any> {
    const { data } = payload;
    const user = await this.userService.findOne({
      where: {
        id: data.id,
      },
    });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    return done(null, payload);
  }
}
