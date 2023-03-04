import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserApplication } from './application/user.application';
import { UserGenerator } from './application/user.generator';
import { TransactionManagerService } from '../configs/trx/transaction-manager.service';
import { KakaoApi } from '../apis/kakao/kakao.api';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserApplication,
    UserGenerator,
    TransactionManagerService,
    KakaoApi,
  ],
})
export class UserModule {}
