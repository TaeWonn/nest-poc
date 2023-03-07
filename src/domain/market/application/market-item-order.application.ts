import { Injectable } from '@nestjs/common';
import { MarketItemService } from '../service/market-item.service';
import { MarketItemOptionService } from '../service/market-item-option.service';
import { MarketItemOrderRequest } from '../dto/market-item-order.request';
import { MarketItemValidator } from './market-item.validator';
import { DataSource } from 'typeorm';
import { MarketItemOrderProvider } from './market-item-order.provider';
import { MarketItemOrderService } from '../service/market-item-order.service';
import { MarketItemOrderDto } from '../dto/market-item-order.dto';
import { TossApiAdapter } from '../../../adapter/toss/toss-api.adapter';
import { MarketItemOrderPaymentRequest } from '../dto/market-item-order-payment.request';
import { MarketItemOrderGenerator } from './market-item-order.generator';
import { PaymentGenerator } from '../../payment/application/payment.generator';
import { PaymentService } from '../../payment/service/payment.service';
import { MarketItemOrderStatus } from '../entity/market-item-order.type';

@Injectable()
export class MarketItemOrderApplication {
  constructor(
    private readonly service: MarketItemService,
    private readonly optionService: MarketItemOptionService,
    private readonly orderService: MarketItemOrderService,
    private readonly validator: MarketItemValidator,
    private readonly provider: MarketItemOrderProvider,
    private readonly orderGenerator: MarketItemOrderGenerator,
    private readonly dataSource: DataSource,
    private readonly tossApiAdapter: TossApiAdapter,
    private readonly paymentGenerator: PaymentGenerator,
    private readonly paymentService: PaymentService,
  ) {}

  async buyItem(dto: MarketItemOrderRequest): Promise<MarketItemOrderDto> {
    const item = await this.service.findByIdOrThrow(dto.marketItemId);
    const options = await item?.options;

    const filterOptions = this.validator.orderValidate(dto, item, options);
    const totalPrice = this.provider.calcTotalPrice(item, filterOptions);
    const order = await this.orderGenerator.generateOrder(
      dto,
      item,
      totalPrice,
      filterOptions,
    );

    await this.dataSource.transaction(
      async () => await this.orderService.insert(order),
    );
    const orderName = this.orderGenerator.generateOrderName(
      await order.options,
    );
    return new MarketItemOrderDto(order, item, await order.options, orderName);
  }

  async paymentConfirm(dto: MarketItemOrderPaymentRequest) {
    const response = await this.tossApiAdapter.marketOrderPaymentConfirm(dto);
    const payment = this.paymentGenerator.paymentGenerate(response);
    await this.dataSource.transaction(async () => {
      await this.paymentService.save(payment);
    });

    await this.dataSource.transaction(async () => {
      const item = await this.orderService.findByIdOrThrow(dto.parseOrderId());
      await this.orderService.updateStatus(item, MarketItemOrderStatus.DONE);
    });
  }
}
