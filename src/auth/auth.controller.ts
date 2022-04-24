import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // user creation
  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  // user validation
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  @Get('/token')
  token() {}
}
