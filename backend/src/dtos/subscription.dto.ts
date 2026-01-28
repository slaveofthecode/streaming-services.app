export class CreateSubscriptionDto {
  clientId: string;
  serviceId: string;
}

export class CancelSubscriptionDto {
  reason?: string;
  effectiveDate?: Date;
}
