import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TossPaymentRequest } from './dto/toss-payment.request';
import { btoa } from 'buffer';
import { TossPaymentDto } from './dto/toss-payment.dto';
import { BadRequestException } from '../../exceptions/bad-request.exception';

@Injectable()
export class TossApi {
  private readonly tossUrl: string;
  private readonly tossSecretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.tossUrl = configService.getOrThrow<string>('TOSS_URL');
    const key = configService.getOrThrow<string>('TOSS_SECRET_KEY');
    this.tossSecretKey = btoa(key + ':');
  }

  async paymentConfirm(request: TossPaymentRequest): Promise<TossPaymentDto> {
    Logger.log(
      `requested toss payment is orderId: ${request.orderId}, amount: ${request.amount}, key: ${request.paymentKey}`,
    );
    const response = await axios
      .post(`${this.tossUrl}/v1/payments/confirm`, request, {
        headers: {
          Authorization: `Basic ${this.tossSecretKey}`,
        },
      })
      .catch((err) => {
        Logger.log(
          `failed toss payment is orderId ${request.orderId}, amount: ${request.amount}, key: ${request.paymentKey}\n
          err => ${err.data}`,
        );
        throw new BadRequestException(err.data);
      });
    return response.data;
  }
}
