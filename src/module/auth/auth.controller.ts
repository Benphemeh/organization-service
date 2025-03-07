import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        data.email,
        data.password,
      );

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token and return user data
      return await this.authService.login(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
