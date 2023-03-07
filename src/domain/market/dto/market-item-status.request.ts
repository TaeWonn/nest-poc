import { MarketItemStatus } from '../entity/market-item.type';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class MarketItemStatusRequest {
  @IsEnum(MarketItemStatus)
  @IsNotEmpty()
  status: MarketItemStatus;
}
