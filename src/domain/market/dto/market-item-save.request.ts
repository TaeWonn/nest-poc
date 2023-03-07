import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { MarketItem } from '../entity/market-item.entity';
import { Type } from 'class-transformer';
import { MarketItemOption } from '../entity/market-item-option.entity';
import { HasMimeType, IsFiles, MemoryStoredFile } from 'nestjs-form-data';

export class MarketItemSaveRequest {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  categoryId: number;

  @IsNumber()
  @Min(100)
  @Type(() => Number)
  price: number;

  @IsFiles()
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  files: MemoryStoredFile[];

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => MarketItemOptionRequest)
  options: MarketItemOptionRequest[];

  toItem(images: Promise<string>[]): MarketItem {
    const item = new MarketItem();
    item.categoryId = this.categoryId;
    item.price = this.price;
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
    return option;
  }
}
