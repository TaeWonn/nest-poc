import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserApplication } from './application/user.application';
import { UserGenerator } from './application/user.generator';
import { KakaoApi } from '../../apis/kakao/kakao.api';
import { JwtModule } from '@nestjs/jwt';
import { UserConverter } from './application/user.converter';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserApplication,
    UserGenerator,
    KakaoApi,
    UserConverter,
    AuthService,
  ],
})
export class UserModule {}
