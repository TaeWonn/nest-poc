import { Module } from '@nestjs/common';
import { MarketItemController } from './controller/market-item.controller';
import { MarketItemService } from './service/market-item.service';
import { MarketItemRepository } from './repository/market-item.repository';
import { MarketItemCategoryRepository } from './repository/market-item-category.repository';
import { MarketItemCategoryService } from './service/market-item-category.service';
import { MarketItemConverter } from './application/market-item.converter';
import { MarketItemApplication } from './application/market-item.application';
import { AwsFileUploadService } from '../../aws/aws-file-upload.service';
import { MarketItemValidator } from './application/market-item.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketItem } from './entity/market-item.entity';
import { MarketItemOption } from './entity/market-item-option.entity';
import { MarketItemCategory } from './entity/market-item-category.entity';
import { MarketItemOptionService } from './service/market-item-option.service';
import { MarketItemOptionRepository } from './repository/market-item-option.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MarketItemOrder } from './entity/market-item-order.entity';
import { MarketItemOrderOption } from './entity/market-item-order-option.entity';
import { MarketItemOrderRepository } from './repository/market-item-order.repository';
import { MarketItemOrderOptionRepository } from './repository/market-item-order-option.repository';
import { MarketItemOrderApplication } from './application/market-item-order.application';
import { MarketItemOrderController } from './controller/market-item-order.controller';
import { MarketItemOrderService } from './service/market-item-order.service';
import { MarketItemOrderProvider } from './application/market-item-order.provider';
import { TossApiAdapter } from '../../adapter/toss/toss-api.adapter';
import { TossApi } from '../../apis/toss/toss.api';
import { MarketItemOrderGenerator } from './application/market-item-order.generator';
import { PaymentGenerator } from '../payment/application/payment.generator';
import { PaymentService } from '../payment/service/payment.service';
import { PaymentRepository } from '../payment/repository/payment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MarketItem,
      MarketItemOption,
      MarketItemCategory,
      MarketItemOrder,
      MarketItemOrderOption,
    ]),
    NestjsFormDataModule,
  ],
  controllers: [MarketItemController, MarketItemOrderController],
  providers: [
    MarketItemService,
    MarketItemCategoryService,
    MarketItemOptionService,
    MarketItemRepository,
    MarketItemCategoryRepository,
    MarketItemOptionRepository,
    MarketItemApplication,
    MarketItemConverter,
    MarketItemValidator,
    AwsFileUploadService,
    //order
    MarketItemOrderService,
    MarketItemOrderRepository,
    MarketItemOrderOptionRepository,
    MarketItemOrderApplication,
    MarketItemOrderProvider,
    MarketItemOrderGenerator,
    PaymentGenerator,
    PaymentService,
    PaymentRepository,
    TossApiAdapter,
    TossApi,
  ],
})
export class MarketItemModule {}
