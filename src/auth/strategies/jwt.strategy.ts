import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from '@config/auth.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('Duong');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig().jwtSecretKey,
    });
  }

  async validate(payload: any) {
    console.log('payload: ', payload);
    return payload;
  }
}
