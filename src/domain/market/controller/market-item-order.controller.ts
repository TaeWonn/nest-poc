import { Body, Controller, Post } from '@nestjs/common';
import { MarketItemOrderApplication } from '../application/market-item-order.application';
import { MarketItemOrderRequest } from '../dto/market-item-order.request';
import { MarketItemOrderDto } from '../dto/market-item-order.dto';
import { MarketItemOrderPaymentRequest } from '../dto/market-item-order-payment.request';

@Controller('api/v1/market/items/order')
export class MarketItemOrderController {
  constructor(private readonly application: MarketItemOrderApplication) {}
  @Post()
  async buyItem(
    @Body() dto: MarketItemOrderRequest,
  ): Promise<MarketItemOrderDto> {
    return await this.application.buyItem(dto);
  }

  @Post('/payment')
  async payment(@Body() dto: MarketItemOrderPaymentRequest) {
    await this.application.paymentConfirm(dto);
  }
}
