import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { MarketItem } from '../entity/market-item.entity';
import { Type } from 'class-transformer';
import { MarketItemOption } from '../entity/market-item-option.entity';
import { HasMimeType, IsFiles, MemoryStoredFile } from 'nestjs-form-data';
import { MarketItemStatus } from '../entity/market-item.type';

export class MarketItemSaveRequest {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  categoryId: number;

  @IsNumber()
  @Min(100)
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsFiles()
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  files: MemoryStoredFile[];

  toItem(images: string[]): MarketItem {
    const item = new MarketItem();
    item.categoryId = this.categoryId;
    item.price = this.price;
    item.title = this.title;
    item.status = MarketItemStatus.AVAILABLE;
    item.images = images;
    return item;
  }
}

export class MarketItemOptionRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  order: number;
  @IsNumber()
  additionalPrice: number;

  toOption() {
    const option = new MarketItemOption();
    option.name = this.name;
    option.order = this.order;
    option.additionalPrice = this.additionalPrice;
    option.marketItemId = 1;
    return option;
  }
}
