import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repository/payment.repository';
import { Payment } from '../entity/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly repository: PaymentRepository) {}

  async save(payment: Payment) {
    await this.repository.save(payment);
  }
}
