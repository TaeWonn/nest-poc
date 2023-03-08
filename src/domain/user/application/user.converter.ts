import { Injectable } from '@nestjs/common';
import { UserLoginDto } from '../dto/user-login.dto';
import { User } from '../entity/user.entity';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UserConverter {
  constructor(private readonly authService: AuthService) {}

  async convertLogingDto(user: User): Promise<UserLoginDto> {
    const accessToken = await this.authService.sign(user);
    return new UserLoginDto(user, accessToken);
  }
}
