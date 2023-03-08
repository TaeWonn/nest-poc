import { Body, Controller, Post } from '@nestjs/common';
import { UserSignUpRequest } from './dto/user-sign-up.request';
import { UserApplication } from './application/user.application';
import { UserLoginRequest } from './dto/user-login.request';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly application: UserApplication) {}

  @Post('/sign-up')
  async signUp(@Body() dto: UserSignUpRequest): Promise<UserLoginDto> {
    return await this.application.signUp(dto.accessToken, dto.nickname);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginRequest): Promise<UserLoginDto> {
    return await this.application.login(dto.accessToken);
  }
}
