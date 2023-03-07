import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MarketItemCategory } from '../entity/market-item-category.entity';

@Injectable()
export class MarketItemCategoryRepository extends Repository<MarketItemCategory> {
  constructor(private readonly dataSource: DataSource) {
    super(MarketItemCategory, dataSource.createEntityManager());
  }
}
