import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { TransactionManagerService } from '../../configs/trx/transaction-manager.service';
import { KakaoApi } from '../../apis/kakao/kakao.api';
import { UserGenerator } from './user.generator';
import { DataSource } from 'typeorm';

@Injectable()
export class UserApplication {
  constructor(
    private readonly service: UserService,
    private readonly generator: UserGenerator,
    private readonly transaction: TransactionManagerService,
    private readonly kakaoApi: KakaoApi,
    private readonly dataSource: DataSource,
  ) {}

  async signUp(accessToken: string, nickname: string) {
    const res = await this.kakaoApi.getUser(accessToken);

    if (!res.id) {
      throw Error('kakao login failed');
    }

    await this.dataSource.transaction(async (manager) => {
      const users = await this.service.findNickname(nickname);
      if (users.length > 0) {
        throw Error('already used nickname');
      }
      const user = this.generator.create(res.id, nickname);
      await this.service.save(user);
    });
    // await this.transaction.execute(async (runner) => {
    //
    // });
  }
}
