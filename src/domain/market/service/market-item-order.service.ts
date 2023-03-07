import { Injectable } from '@nestjs/common';
import { MarketItemOrderRepository } from '../repository/market-item-order.repository';
import { MarketItemOrder } from '../entity/market-item-order.entity';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { MarketItemOrderStatus } from '../entity/market-item-order.type';

@Injectable()
export class MarketItemOrderService {
  constructor(private readonly repository: MarketItemOrderRepository) {}

  async insert(order: MarketItemOrder) {
    await this.repository.save(order);
  }

  async findByIdOrThrow(id: number) {
    const order = this.repository.findOneBy({ id });

    if (!order) {
      throw new BadRequestException(`order not found is ${id}`);
    }
    return order;
  }

  async updateStatus(item: MarketItemOrder, status: MarketItemOrderStatus) {
    item.status = status;
    await this.repository.save(item);
  }
}
