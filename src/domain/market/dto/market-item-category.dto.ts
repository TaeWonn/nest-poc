import { MarketItemCategory } from '../entity/market-item-category.entity';

export class MarketItemCategoryDto {
  id: number;
  name: string;
  order: number;

  constructor(category: MarketItemCategory) {
    this.id = category.id;
    this.name = category.name;
    this.order = category.order;
  }
}
