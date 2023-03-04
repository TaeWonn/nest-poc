import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './configs/typeorm/type-orm-config.service';
import { TypeOrmConfigModule } from './configs/typeorm/type-orm-config.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      //validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
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
