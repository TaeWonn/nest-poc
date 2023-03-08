import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignUpRequest {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
