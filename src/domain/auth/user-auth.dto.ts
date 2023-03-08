import { User } from '../user/entity/user.entity';

export class UserAuthDto {
  id: number;
  nickname: string;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
  }
}
