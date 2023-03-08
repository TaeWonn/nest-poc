import { MarketItem } from '../entity/market-item.entity';

export class MarketItemListDto {
  id: number;
  title: string;
  price: number;
  image: string;

  constructor(item: MarketItem, image: string) {
    this.id = item.id;
    this.title = item.title;
    this.price = item.price;
    this.image = image;
  }
}
