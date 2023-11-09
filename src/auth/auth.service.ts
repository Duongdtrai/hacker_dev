import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    console.log('user:', user);
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    // const compareResult = await bcrypt.compare(password, user.password);
    // if (!compareResult) {
    //   throw new UnauthorizedException('Email or password is incorrect');
    // }
    if (password !== user.password) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    return user;
  }

  async generateJwtToken(
    user: User,
    ip: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      id: user.id,
    };
    console.log(this.configService.get<string>('jwtExpiresIn'));
    await this.userService.update(user.id, { ip });
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('jwtExpiresIn'),
      }),
    };
  }
}
