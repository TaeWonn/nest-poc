import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { MarketItemOrderApplication } from '../application/market-item-order.application';
import { MarketItemOrderRequest } from '../dto/market-item-order.request';
import { MarketItemOrderDto } from '../dto/market-item-order.dto';
import { MarketItemOrderPaymentRequest } from '../dto/market-item-order-payment.request';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserAuthDto } from '../../auth/user-auth.dto';

@Controller('api/v1/market/items/order')
export class MarketItemOrderController {
  constructor(private readonly application: MarketItemOrderApplication) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async buyItem(
    @Request() req,
    @Body() dto: MarketItemOrderRequest,
  ): Promise<MarketItemOrderDto> {
    const user = req.user as UserAuthDto;
    return await this.application.buyItem(dto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/payment')
  async payment(@Body() dto: MarketItemOrderPaymentRequest) {
    await this.application.paymentConfirm(dto);
  }
}
