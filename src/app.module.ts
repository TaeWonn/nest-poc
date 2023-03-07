import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './configs/typeorm/type-orm-config.service';
import { TypeOrmConfigModule } from './configs/typeorm/type-orm-config.module';
import { MarketItemModule } from './domain/market/market-item.module';
import { MulterModule } from '@nestjs/platform-express';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FormDataConfigService } from './configs/form-data.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    MulterModule.register({
      dest: './files',
    }),
    NestjsFormDataModule.configAsync({ useClass: FormDataConfigService }),
    UserModule,
    MarketItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   //exclude 함수는 제외 하고싶은 라우터를 등록합니다.
    //   .exclude({ path: 'user/create_user', method: RequestMethod.POST }) // 유저 생성
    //   .exclude({ path: 'user/user_all', method: RequestMethod.GET }) // 유저 전체 조회
    //   .forRoutes(UserController); // 1.유저 컨트롤러 등록
    // // .forRoutes('user'); // 2.유저 컨트롤러 경로 등록 -> 위 1번과 동일
  }
}
