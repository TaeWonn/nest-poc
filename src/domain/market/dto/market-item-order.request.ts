import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MarketItemOrder } from '../entity/market-item-order.entity';
import { MarketItemOrderStatus } from '../entity/market-item-order.type';

export class MarketItemOrderRequest {
  @IsNumber()
  marketItemId: number;
  @IsNumber({}, { each: true })
  marketItemOptionsIds: number[];
  @IsNumber()
  userId: number;
  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  toOrder(totalPrice: number): MarketItemOrder {
    const order = new MarketItemOrder();
    order.contactPhone = this.contactPhone;
    order.status = MarketItemOrderStatus.ORDERED;
    order.totalPrice = totalPrice;
    order.buyerId = this.userId;
    return order;
  }
}
