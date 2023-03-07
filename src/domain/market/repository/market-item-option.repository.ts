import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MarketItemOption } from '../entity/market-item-option.entity';

@Injectable()
export class MarketItemOptionRepository extends Repository<MarketItemOption> {
  constructor(private readonly dataSource: DataSource) {
    super(MarketItemOption, dataSource.createEntityManager());
  }
}
