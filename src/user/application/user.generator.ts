import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';

@Injectable()
export class UserGenerator {
  create(kakaoUserId: number, nickname: string) {
    const user = new User();
    user.kakaoUserId = kakaoUserId;
    user.nickname = nickname;
    return user;
  }
}
