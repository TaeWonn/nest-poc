import { Body, Controller, Post } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserApplication } from './application/user.application';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly application: UserApplication) {}

  // @Get('/:id')
  // getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   return this.service.getUser(id);
  // }

  @Post()
  async signUp(@Body() dto: UserSignUpDto) {
    await this.application.signUp(dto.accessToken, dto.nickname);
  }
}
