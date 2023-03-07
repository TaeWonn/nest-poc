import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { KakaoApi } from '../../../apis/kakao/kakao.api';
import { UserGenerator } from './user.generator';
import { DataSource } from 'typeorm';
import { BadRequestException } from '../../../exceptions/bad-request.exception';

@Injectable()
export class UserApplication {
  constructor(
    private readonly service: UserService,
    private readonly generator: UserGenerator,
    private readonly kakaoApi: KakaoApi,
    private readonly dataSource: DataSource,
  ) {}

  async signUp(accessToken: string, nickname: string) {
    const res = await this.kakaoApi.getUser(accessToken);

    if (!res.id) {
      throw new BadRequestException('kakao login failed');
    }

    await this.dataSource.transaction(async () => {
      const users = await this.service.findNickname(nickname);
      if (users.length > 0) {
        throw new BadRequestException('already used nickname');
      }
      const user = this.generator.create(res.id, nickname);
      await this.service.save(user);
    });
  }

  async login(accessToken: string) {
    const res = await this.kakaoApi.getUser(accessToken);
    if (!res.id) {
      throw new BadRequestException('kakao login failed');
    }

    const user = await this.service.findKakaoUserId(res.id);
    if (!user) {
      throw new BadRequestException('user not found');
    }
  }
}
