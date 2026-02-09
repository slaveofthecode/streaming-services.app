import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { Service } from '../entities/service.entity';
import { Client } from '../entities/client.entity';
import {
  CreateSubscriptionDto,
  CancelSubscriptionDto,
} from '../dtos/subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async subscribe(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const client = await this.clientsRepository.findOne({
      where: { id: createSubscriptionDto.clientId },
    });
    const service = await this.servicesRepository.findOne({
      where: { id: createSubscriptionDto.serviceId },
    });

    if (!client || !service) {
      throw new Error('Client or Service not found');
    }

    const subscription = this.subscriptionsRepository.create({
      client,
      service,
      priceAtSubscription: service.currentPrice,
      status: 'active',
    });

    return await this.subscriptionsRepository.save(subscription);
  }

  async getClientSubscriptions(clientId: string): Promise<Subscription[]> {
    return await this.subscriptionsRepository.find({
      where: { clientId },
      relations: ['service'],
    });
  }

  async getActiveSubscriptions(): Promise<Subscription[]> {
    return await this.subscriptionsRepository.find({
      where: { status: 'active' },
      relations: ['client', 'service'],
    });
  }

  async cancelSubscription(
    subscriptionId: string,
    cancelDto?: CancelSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.status = 'cancelled';
    subscription.cancelledAt = new Date();

    return await this.subscriptionsRepository.save(subscription);
  }

  async pauseSubscription(subscriptionId: string): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.status = 'paused';
    return await this.subscriptionsRepository.save(subscription);
  }

  async resumeSubscription(subscriptionId: string): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.status = 'active';
    return await this.subscriptionsRepository.save(subscription);
  }
}
