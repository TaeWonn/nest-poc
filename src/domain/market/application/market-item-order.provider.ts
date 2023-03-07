import { Injectable } from '@nestjs/common';
import { MarketItem } from '../entity/market-item.entity';
import { MarketItemOption } from '../entity/market-item-option.entity';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { MarketItemOrderOption } from '../entity/market-item-order-option.entity';

@Injectable()
export class MarketItemOrderProvider {
  calcTotalPrice(item: MarketItem, options: MarketItemOption[]): number {
    let totalPrice = 0;

    options.forEach((option) => {
      totalPrice += item.price + option.additionalPrice;
    });

    if (totalPrice == 0) {
      throw new BadRequestException('option not selected');
    }
    return totalPrice;
  }

  toOptions(options: MarketItemOption[]): Promise<MarketItemOrderOption[]> {
    const orderOptions = options.map((option) => {
      const orderOption = new MarketItemOrderOption();
      orderOption.optionId = option.id;
      orderOption.name = option.name;
      orderOption.additionalPrice = option.additionalPrice;
      return orderOption;
    });

    return Promise.resolve(orderOptions);
  }
}
