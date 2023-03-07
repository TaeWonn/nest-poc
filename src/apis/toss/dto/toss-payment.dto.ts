export class TossPaymentDto {
  mId: string;
  lastTransactionKey: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  currency: string;
  method: string;
  status: string;
  requestedAt: Date;
  approvedAt: Date;
  useEscrow: boolean;
  cultureExpense: boolean;
  card: TossCardDto | null;
  receipt: TossReceipt;
  checkout: TossCheckout;
  cancels: TossCancel[] | null;
  secret: string | null;
  type: string;
  isPartialCancelable: boolean;
  easyPay: string | null;
  country: string;
  failure: null;
  totalAmount: number | null;
  balanceAmount: number | null;
  suppliedAmount: number | null;
  vat: number | null;
  taxFreeAmount: number;
  taxExemptionAmount: number;
}

export class TossCardDto {
  amount: number;
  issuerCode: string;
  acquirerCode: string;
  number: string;
  installmentPlanMonths: number;
  isInterestFree: boolean;
  interestPayer: string | undefined;
  approveNo: string;
  useCardPoint: boolean;
  cardType: string;
  ownerType: string;
  acquireStatus: string;
}

export class TossReceipt {
  url: string;
}
export class TossCheckout {
  url: string;
}
export class TossCancel {
  cancelAmount: number;
  cancelReason: string;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  refundableAmount: number;
  easyPayDiscountAmount: number;
  canceledAt: string;
  transactionKey: string;
}
