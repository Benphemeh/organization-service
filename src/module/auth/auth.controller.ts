import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() data: LoginDto) {
    try {
      // Validate user credentials
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
  //   @UseGuards(DoesUserExist)
  //   @Post('signup')
  //   async signUp(@Body() user: CreateUserDTO) {
  //     return await this.authService.create(user);
  //   }
}
