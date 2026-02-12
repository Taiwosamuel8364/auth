import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }

  async createNewUser(user: CreateUserDto): Promise<any> {
    const newUser = await this.userService.createUser(user);
    if (newUser) {
      const { password, username, ...rest } = newUser;
      const payload = { username: newUser.username, sub: newUser.id };
      return {
        rest,
        access_token: this.jwtService.sign(payload),
      };
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
