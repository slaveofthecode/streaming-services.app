import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { PriceHistory } from '../entities/price-history.entity';
import { ServicesService } from '../services/services.service';
import { ServicesController } from '../controllers/services.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service, PriceHistory])],
  providers: [ServicesService],
  controllers: [ServicesController],
  exports: [ServicesService],
})
export class ServicesModule {}
