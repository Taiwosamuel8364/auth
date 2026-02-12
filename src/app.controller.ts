import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDto } from './users/dto/createUser.dto';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  // POST Login
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  /// Post Signup
  @Post('auth/signup')
  signup(@Body() createUserDto: CreateUserDto): any {
    return this.authService.createNewUser(createUserDto);
  }

  // GET /protected
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getHello(): string {
    return this.appService.getHello();
  }
  getProfile(@Request() req) {
    return req.user;
  }
}
