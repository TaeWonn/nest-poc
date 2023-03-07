import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { MarketItemSaveRequest } from '../dto/market-item-save.request';
import { MarketItemOrderRequest } from '../dto/market-item-order.request';
import { MarketItemOption } from '../entity/market-item-option.entity';
import { MarketItem } from '../entity/market-item.entity';
import { MarketItemStatus } from '../entity/market-item.type';

@Injectable()
export class MarketItemValidator {
  saveValidate(dto: MarketItemSaveRequest) {
    if (!dto.files || dto.files.length == 0) {
      throw new BadRequestException('image empty');
    }

    if (!dto.options || dto.options.length === 0) {
      throw new BadRequestException('option empty');
    }
    dto.options.forEach((option) => {
      if (dto.price - option.additionalPrice <= 0) {
        throw new BadRequestException('option price is over then item price');
      }
    });
  }

  orderValidate(
    dto: MarketItemOrderRequest,
    marketItem: MarketItem,
    options: MarketItemOption[],
  ): MarketItemOption[] {
    if (!marketItem || !options) {
      throw new BadRequestException('not found item or option');
    }
    if (marketItem.status.valueOf() !== MarketItemStatus.AVAILABLE.valueOf()) {
      throw new BadRequestException('item is deleted');
    }
    const filteredIds = options.filter((option) =>
      dto.marketItemOptionsIds.includes(option.id),
    );
    if (filteredIds.length === 0) {
      throw new BadRequestException('check options is deleted');
    }

    return filteredIds;
  }
}
