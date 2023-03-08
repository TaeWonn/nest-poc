import { Injectable } from '@nestjs/common';
import { MarketItemOptionRepository } from '../repository/market-item-option.repository';

@Injectable()
export class MarketItemOptionService {
  constructor(private readonly repository: MarketItemOptionRepository) {}
}
