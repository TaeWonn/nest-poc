import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MarketItemOrderOption } from '../entity/market-item-order-option.entity';

@Injectable()
export class MarketItemOrderOptionRepository extends Repository<MarketItemOrderOption> {
  constructor(private readonly dataSource: DataSource) {
    super(MarketItemOrderOption, dataSource.createEntityManager());
  }
}
