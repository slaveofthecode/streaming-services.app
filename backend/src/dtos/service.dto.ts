export class CreateServiceDto {
  name: string;
  description?: string;
  currentPrice: number;
  billingCycle: string;
}

export class UpdateServicePriceDto {
  newPrice: number;
  reason?: string;
}

export class UpdateServiceDto {
  name?: string;
  description?: string;
  isActive?: boolean;
}
