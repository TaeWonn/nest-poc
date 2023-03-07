import { Injectable } from '@nestjs/common';
import { MarketItemCategoryRepository } from '../repository/market-item-category.repository';
import { MarketItemCategory } from '../entity/market-item-category.entity';

@Injectable()
export class MarketItemCategoryService {
  constructor(private readonly repository: MarketItemCategoryRepository) {}

  async findCategories(): Promise<MarketItemCategory[]> {
    return await this.repository.findBy({ deletedAt: null });
  }
}
