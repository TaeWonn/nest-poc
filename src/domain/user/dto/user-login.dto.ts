import { User } from '../entity/user.entity';

export class UserLoginDto {
  id: number;
  name: string;
  accessToken: string;

  constructor(user: User, accessToken: string) {
    this.id = user.id;
    this.name = user.name;
    this.accessToken = accessToken;
  }
}
