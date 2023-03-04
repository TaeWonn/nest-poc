import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { KakaoGetUserResponse } from './dto/kakao-get-user.response';

@Injectable()
export class KakaoApi {
  private readonly kakaoUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.kakaoUrl = configService.getOrThrow<string>('KAKAO_URL');
  }

  async getUser(accessToken: string): Promise<KakaoGetUserResponse> {
    return await (
      await axios.get(`${this.kakaoUrl}/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }
}
