import { Injectable } from '@nestjs/common';
import { MarketItemRepository } from '../repository/market-item.repository';
import { MarketItem } from '../entity/market-item.entity';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { MarketItemStatus } from '../entity/market-item.type';

@Injectable()
export class MarketItemService {
  constructor(private readonly repository: MarketItemRepository) {}

  async getAvailableItems(
    categoryId: number,
    page: number,
    size: number,
  ): Promise<MarketItem[]> {
    return this.repository
      .createQueryBuilder('item')
      .where({ categoryId, status: MarketItemStatus.AVAILABLE })
      .orderBy('id', 'DESC')
      .take(size)
      .skip((page - 1) * size)
      .getMany();
  }

  async insert(item: MarketItem) {
    await this.repository.insert(item);
  }

  async save(item: MarketItem) {
    await this.repository.save(item);
  }

  async findByIdOrThrow(id: number): Promise<MarketItem> {
    const item = await this.repository.findOneBy({ id });
    if (!item || item.deletedAt) {
      throw new BadRequestException(`marketItem Not Found by ${id}`);
    }
    return item;
  }
}
