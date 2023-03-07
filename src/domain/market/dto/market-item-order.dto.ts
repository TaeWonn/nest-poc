import { MarketItemOrderStatus } from '../entity/market-item-order.type';
import { MarketItemOrder } from '../entity/market-item-order.entity';
import { MarketItem } from '../entity/market-item.entity';
import { MarketItemOrderOption } from '../entity/market-item-order-option.entity';

export class MarketItemOrderDto {
  id: number;
  contactPhone: string;
  status: MarketItemOrderStatus;
  totalPrice: number;
  item: MarketItemDto;
  options: MarketOptionDto[];
  payment: MarketPaymentDto;

  constructor(
    order: MarketItemOrder,
    item: MarketItem,
    options: MarketItemOrderOption[],
    orderName: string,
  ) {
    this.id = order.id;
    this.contactPhone = order.contactPhone;
    this.status = order.status;
    this.totalPrice = order.totalPrice;
    this.item = new MarketItemDto(item);
    this.options = options.map((option) => new MarketOptionDto(option));
    this.payment = new MarketPaymentDto(
      order.totalPrice,
      `market-${order.id}`,
      orderName,
    );
  }
}

export class MarketItemDto {
  id: number;
  title: string;

  constructor(item: MarketItem) {
    this.id = item.id;
    this.title = item.title;
  }
}

export class MarketOptionDto {
  id: number;
  name: string;
  additionalPrice: number;

  constructor(option: MarketItemOrderOption) {
    this.id = option.id;
    this.name = option.name;
    this.additionalPrice = option.additionalPrice;
  }
}

export class MarketPaymentDto {
  amount: number;
  orderId: string;
  orderName: string;

  constructor(amount: number, orderId: string, orderName: string) {
    this.amount = amount;
    this.orderId = orderId;
    this.orderName = orderName;
  }
}
