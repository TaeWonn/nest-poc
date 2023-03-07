import { Injectable } from '@nestjs/common';
import { MarketItemCategory } from '../entity/market-item-category.entity';
import { MarketItemCategoryDto } from '../dto/market-item-category.dto';

@Injectable()
export class MarketItemConverter {
  convertCategories(categories: MarketItemCategory[]): MarketItemCategoryDto[] {
    return categories
      .sort((a, b): number => a.order - b.order)
      .map((category) => new MarketItemCategoryDto(category));
  }
}
