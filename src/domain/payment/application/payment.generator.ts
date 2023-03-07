import { Injectable } from '@nestjs/common';
import { TossPaymentDto } from '../../../apis/toss/dto/toss-payment.dto';
import { Payment } from '../entity/payment.entity';

@Injectable()
export class PaymentGenerator {
  paymentGenerate(dto: TossPaymentDto) {
    const payment = new Payment();
    payment.orderId = dto.orderId;
    payment.orderName = dto.orderName;
    payment.paymentKey = dto.paymentKey;
    payment.method = dto.method;
    payment.status = dto.status;
    payment.totalAmount = dto.totalAmount;
    payment.isPartialCancelable = dto.isPartialCancelable;
    payment.vat = dto.vat;
    payment.receiptUrl = dto.receipt?.url;
    payment.checkoutUrl = dto.checkout?.url;
    payment.issuerCode = dto.card?.issuerCode;
    payment.acquirerCode = dto.card?.acquirerCode;
    payment.installmentPlanMonths = dto.card?.installmentPlanMonths;
    payment.cardType = dto.card?.cardType;
    return payment;
  }
}
