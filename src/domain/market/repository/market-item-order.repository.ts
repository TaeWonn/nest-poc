import { Injectable } from '@nestjs/common';
import { MarketItemOrder } from '../entity/market-item-order.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MarketItemOrderRepository extends Repository<MarketItemOrder> {
  constructor(private readonly datasource: DataSource) {
    super(MarketItemOrder, datasource.createEntityManager());
  }
}
