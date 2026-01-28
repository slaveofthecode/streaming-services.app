import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { CreateServiceDto, UpdateServicePriceDto } from '../dtos/service.dto';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async createService(createServiceDto: CreateServiceDto) {
    return await this.servicesService.createService(createServiceDto);
  }

  @Get()
  async getAllServices() {
    return await this.servicesService.getAllServices();
  }

  @Get(':id')
  async getServiceById(id: string) {
    return await this.servicesService.getServiceById(id);
  }

  @Put(':id/price')
  async updateServicePrice(id: string, updatePriceDto: UpdateServicePriceDto) {
    return await this.servicesService.updateServicePrice(id, updatePriceDto);
  }

  @Put(':id/deactivate')
  async deactivateService(id: string) {
    return await this.servicesService.deactivateService(id);
  }

  @Get(':id/price-history')
  async getPriceHistory(id: string) {
    return await this.servicesService.getPriceHistory(id);
  }
}
