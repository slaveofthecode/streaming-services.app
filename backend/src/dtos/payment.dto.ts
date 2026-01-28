export class CreatePaymentDto {
  clientId: string;
  amount: number;
  status: string;
  paymentMethod?: string;
  externalTransactionId?: string;
  billingMonth: Date;
  notes?: string;
}

export class UpdatePaymentStatusDto {
  status: string;
}
