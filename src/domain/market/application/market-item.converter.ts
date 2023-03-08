import { Injectable } from '@nestjs/common';
import { MarketItemCategory } from '../entity/market-item-category.entity';
import { MarketItemCategoryDto } from '../dto/market-item-category.dto';
import { MarketItem } from '../entity/market-item.entity';
import { MarketItemOneDto } from '../dto/market-item-one.dto';
import { ConfigService } from '@nestjs/config';
import { MarketItemListDto } from '../dto/market-item-list.dto';

@Injectable()
export class MarketItemConverter {
  private readonly cloudFrontUrl;
  constructor(private readonly configService: ConfigService) {
    this.cloudFrontUrl = configService.get<string>('CLOUD_FRONT_URL');
  }
  convertCategories(categories: MarketItemCategory[]): MarketItemCategoryDto[] {
    return categories
      .sort((a, b): number => a.order - b.order)
      .map((category) => new MarketItemCategoryDto(category));
  }

  async getItem(item: MarketItem): Promise<MarketItemOneDto> {
    const images = item.images.map((image) => `${this.cloudFrontUrl}${image}`);
    return new MarketItemOneDto(item, await item.options, images);
  }

  getItems(items: MarketItem[]): MarketItemListDto[] {
    return items.map((item) => {
      const image = `${this.cloudFrontUrl}${item.images[0]}`;
      return new MarketItemListDto(item, image);
    });
  }
}
