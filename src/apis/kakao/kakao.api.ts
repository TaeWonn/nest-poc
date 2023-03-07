import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { KakaoGetUserResponse } from './dto/kakao-get-user.response';
import { BadRequestException } from '../../exceptions/bad-request.exception';

@Injectable()
export class KakaoApi {
  private readonly kakaoUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.kakaoUrl = configService.getOrThrow<string>('KAKAO_URL');
  }

  async getUser(accessToken: string): Promise<KakaoGetUserResponse> {
    const response = await axios
      .get(`${this.kakaoUrl}/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch(() => {
        throw new BadRequestException(null);
      });

    return response.data;
  }
}
