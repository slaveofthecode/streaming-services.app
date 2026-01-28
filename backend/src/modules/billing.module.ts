import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { Subscription } from '../entities/subscription.entity';
import { Client } from '../entities/client.entity';
import { Service } from '../entities/service.entity';
import { BillingService } from '../services/billing.service';
import { BillingController } from '../controllers/billing.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Subscription, Client, Service]),
  ],
  providers: [BillingService],
  controllers: [BillingController],
  exports: [BillingService],
})
export class BillingModule {}
