import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './type-orm-config.service';

@Module({
  providers: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
