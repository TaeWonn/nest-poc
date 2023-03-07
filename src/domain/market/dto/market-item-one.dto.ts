import { MarketItemStatus } from '../entity/market-item.type';
import { MarketItem } from '../entity/market-item.entity';
import { MarketItemOption } from '../entity/market-item-option.entity';

export class MarketItemOneDto {
  id: number;
  title: string;
  status: MarketItemStatus;
  price: number;
  createdAt: Date;
  options: MarketItemOptionDto[] = [];

  constructor(item: MarketItem, options: MarketItemOption[]) {
    this.id = item.id;
    this.title = item.title;
    this.status = item.status;
    this.price = item.price;
    this.createdAt = item.createdAt;
    this.options = options
      ?.sort((a, b) => a.order - b.order)
      ?.map((option) => new MarketItemOptionDto(option));
  }
}

export class MarketItemOptionDto {
  id: number;
  name: string;
  additionalPrice: number;
  createdAt: Date;

  constructor(option: MarketItemOption) {
    this.id = option.id;
    this.name = option.name;
    this.additionalPrice = option.additionalPrice;
    this.createdAt = option.createdAt;
  }
}
