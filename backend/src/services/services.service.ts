import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { PriceHistory } from '../entities/price-history.entity';
import { CreateServiceDto, UpdateServicePriceDto } from '../dtos/service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(PriceHistory)
    private priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create(createServiceDto);
    return await this.servicesRepository.save(service);
  }

  async getAllServices(): Promise<Service[]> {
    return await this.servicesRepository.find({
      relations: ['subscriptions', 'priceHistories'],
    });
  }

  async getServiceById(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['subscriptions', 'priceHistories'],
    });
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  }

  async updateServicePrice(
    id: string,
    updatePriceDto: UpdateServicePriceDto,
  ): Promise<Service> {
    const service = await this.getServiceById(id);

    // Registrar el cambio de precio en el historial
    const priceHistory = this.priceHistoryRepository.create({
      service,
      oldPrice: service.currentPrice,
      newPrice: updatePriceDto.newPrice,
      reason: updatePriceDto.reason,
      effectiveFrom: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // Próximo mes
    });

    await this.priceHistoryRepository.save(priceHistory);

    // Actualizar el precio actual
    service.currentPrice = updatePriceDto.newPrice;
    return await this.servicesRepository.save(service);
  }

  async deactivateService(id: string): Promise<Service> {
    const service = await this.getServiceById(id);
    service.isActive = false;
    return await this.servicesRepository.save(service);
  }

  async getPriceHistory(serviceId: string): Promise<PriceHistory[]> {
    return await this.priceHistoryRepository.find({
      where: { serviceId },
      order: { changedAt: 'DESC' },
    });
  }
}
