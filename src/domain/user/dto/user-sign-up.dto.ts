import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
