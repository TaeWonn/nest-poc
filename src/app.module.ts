import { Module } from '@nestjs/common';
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
import { AuthModule } from './domain/auth/auth.module';
import { EventGateway } from './socket/event.gateway';

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
    AuthModule,
    EventGateway,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
