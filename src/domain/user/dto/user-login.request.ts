import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginRequest {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
