import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../entities/subscription.entity';
import { Service } from '../entities/service.entity';
import { Client } from '../entities/client.entity';
import { SubscriptionsService } from '../services/subscriptions.service';
import { SubscriptionsController } from '../controllers/subscriptions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Service, Client])],
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
