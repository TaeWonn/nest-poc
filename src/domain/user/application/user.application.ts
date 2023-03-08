import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { KakaoApi } from '../../../apis/kakao/kakao.api';
import { UserGenerator } from './user.generator';
import { DataSource } from 'typeorm';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserConverter } from './user.converter';

@Injectable()
export class UserApplication {
  constructor(
    private readonly service: UserService,
    private readonly generator: UserGenerator,
    private readonly kakaoApi: KakaoApi,
    private readonly dataSource: DataSource,
    private readonly converter: UserConverter,
  ) {}

  async signUp(accessToken: string, nickname: string): Promise<UserLoginDto> {
    const res = await this.kakaoApi.getUser(accessToken);

    if (!res.id) {
      throw new BadRequestException('kakao login failed');
    }
    const user = await this.service.findKakaoUserId(res.id);

    if (user) {
      return await this.converter.convertLogingDto(user);
    }

    return await this.dataSource.transaction(async () => {
      const users = await this.service.findNickname(nickname);
      if (users.length > 0) {
        throw new BadRequestException('already used nickname');
      }
      const user = this.generator.create(res.id, nickname);
      await this.service.save(user);
      return await this.converter.convertLogingDto(user);
    });
  }

  async login(accessToken: string): Promise<UserLoginDto> {
    const res = await this.kakaoApi.getUser(accessToken);
    if (!res.id) {
      throw new BadRequestException('kakao login failed');
    }

    const user = await this.service.findKakaoUserId(res.id);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    return await this.converter.convertLogingDto(user);
  }
}
