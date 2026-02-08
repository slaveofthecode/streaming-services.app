import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './modules/services.module';
import { ClientsModule } from './modules/clients.module';
import { SubscriptionsModule } from './modules/subscriptions.module';
import { BillingModule } from './modules/billing.module';
import { Service } from './entities/service.entity';
import { Client } from './entities/client.entity';
import { Subscription } from './entities/subscription.entity';
import { Payment } from './entities/payment.entity';
import { PriceHistory } from './entities/price-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'streaming_subscriptions',
      entities: [Service, Client, Subscription, Payment, PriceHistory],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    ServicesModule,
    ClientsModule,
    SubscriptionsModule,
    BillingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
