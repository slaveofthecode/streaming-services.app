import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { SubscriptionsService } from '../services/subscriptions.service';
import {
  CreateSubscriptionDto,
  CancelSubscriptionDto,
} from '../dtos/subscription.dto';

@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async subscribe(createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionsService.subscribe(createSubscriptionDto);
  }

  @Get('client/:clientId')
  async getClientSubscriptions(clientId: string) {
    return await this.subscriptionsService.getClientSubscriptions(clientId);
  }

  @Get('active')
  async getActiveSubscriptions() {
    return await this.subscriptionsService.getActiveSubscriptions();
  }

  @Put(':id/cancel')
  async cancelSubscription(id: string, cancelDto?: CancelSubscriptionDto) {
    return await this.subscriptionsService.cancelSubscription(id, cancelDto);
  }

  @Put(':id/pause')
  async pauseSubscription(id: string) {
    return await this.subscriptionsService.pauseSubscription(id);
  }

  @Put(':id/resume')
  async resumeSubscription(id: string) {
    return await this.subscriptionsService.resumeSubscription(id);
  }
}
