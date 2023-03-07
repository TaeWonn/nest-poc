import { Injectable, Logger } from '@nestjs/common';
import { TossApi } from '../../apis/toss/toss.api';
import { MarketItemOrderPaymentRequest } from '../../domain/market/dto/market-item-order-payment.request';

@Injectable()
export class TossApiAdapter {
  constructor(private readonly api: TossApi) {}

  async marketOrderPaymentConfirm(dto: MarketItemOrderPaymentRequest) {
    const request = dto.toPaymentRequest();
    const response = await this.api.paymentConfirm(request);
    Logger.log(response);
    return response;
  }
}
