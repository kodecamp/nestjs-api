import {
  BadRequestException,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/user.dto';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  private userDto: UserDto = null;
  constructor(
    prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(authDto: AuthDto) {
    if (this.userDto === null) {
      throw new BadRequestException('User is not signed up. Signup first.');
    }
    const { email, password } = authDto;

    const pwMatches = await argon2.verify(this.userDto.hash, password);
    log(pwMatches);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    if (email != this.userDto.email) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const copyDto = { ...this.userDto };
    delete copyDto.hash;
    return this.signToken(this.userDto.id, this.userDto.email, 'admin');
  }

  async signup(authDto: AuthDto): Promise<UserDto> {
    const hash = await argon2.hash(authDto.password);
    if (this.userDto == null) {
      this.userDto = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        hash: hash,
        email: authDto.email,
        firstName: 'Sunil',
        lastName: 'Verma',
      };
    }
    return this.userDto;
  }

  async signToken(userId: number, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: accessToken,
    };
  }
}
