import { DataSource, Repository } from 'typeorm';
import { MarketItem } from '../entity/market-item.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketItemRepository extends Repository<MarketItem> {
  constructor(private readonly datasource: DataSource) {
    super(MarketItem, datasource.createEntityManager());
  }
}
