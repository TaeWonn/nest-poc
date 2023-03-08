import { Injectable } from '@nestjs/common';
import { MarketItemOrderOption } from '../entity/market-item-order-option.entity';
import { MarketItemOrderRequest } from '../dto/market-item-order.request';
import { MarketItemOption } from '../entity/market-item-option.entity';
import { MarketItem } from '../entity/market-item.entity';
import { MarketItemOrderProvider } from './market-item-order.provider';
import { MarketItemOrder } from '../entity/market-item-order.entity';

@Injectable()
export class MarketItemOrderGenerator {
  constructor(private readonly provider: MarketItemOrderProvider) {}

  async generateOrder(
    dto: MarketItemOrderRequest,
    item: MarketItem,
    totalPrice: number,
    filterOptions: MarketItemOption[],
    userId: number,
  ): Promise<MarketItemOrder> {
    const order = dto.toOrder(totalPrice, userId);
    order.options = this.provider.toOptions(filterOptions);
    order.marketItem = Promise.resolve(item);
    return order;
  }

  generateOrderName(options: MarketItemOrderOption[]): string {
    if (options.length === 0) {
      return '알 수 없음';
    }
    if (options.length === 1) {
      return options[0].name;
    }

    return `${options[0].name} 외 ${options.length - 1}건`;
  }
}
