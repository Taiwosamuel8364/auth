import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super(); // CONFIG if you are using other strategy like facebbok or google
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authservice.ValidateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
