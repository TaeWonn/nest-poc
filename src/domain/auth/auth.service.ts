import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { UserAuthDto } from './user-auth.dto';
import { ConfigService } from '@nestjs/config';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = configService.getOrThrow<string>('JWT_SECRET');
  }

  async sign(user: User): Promise<string> {
    const dto = new UserAuthDto(user);
    const payload = classToPlain(dto);
    return this.jwtService.sign(payload, {
      secret: this.jwtSecret,
    });
  }
}
