import { IsNumber, IsString } from 'class-validator';
import { TossPaymentRequest } from '../../../apis/toss/dto/toss-payment.request';

export class MarketItemOrderPaymentRequest {
  @IsString()
  orderId: string;

  @IsString()
  paymentKey: string;

  @IsNumber()
  amount: number;

  toPaymentRequest(): TossPaymentRequest {
    const request = new TossPaymentRequest();
    request.orderId = this.orderId;
    request.amount = this.amount;
    request.paymentKey = this.paymentKey;
    return request;
  }

  parseOrderId(): number {
    return parseInt(this.orderId.split('-')[1]);
  }
}
