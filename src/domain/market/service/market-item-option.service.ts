import { Injectable } from '@nestjs/common';
import { MarketItemOptionRepository } from '../repository/market-item-option.repository';
import { MarketItemOption } from '../entity/market-item-option.entity';

@Injectable()
export class MarketItemOptionService {
  constructor(private readonly repository: MarketItemOptionRepository) {}

  async insertAll(options: MarketItemOption[]) {
    await this.repository.save(options);
  }
}
