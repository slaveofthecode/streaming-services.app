import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';

@Controller('api/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async createClient(createClientDto: CreateClientDto) {
    return await this.clientsService.createClient(createClientDto);
  }

  @Get()
  async getAllClients() {
    return await this.clientsService.getAllClients();
  }

  @Get(':id')
  async getClientById(id: string) {
    return await this.clientsService.getClientById(id);
  }

  @Put(':id')
  async updateClient(id: string, updateClientDto: UpdateClientDto) {
    return await this.clientsService.updateClient(id, updateClientDto);
  }

  @Put(':id/deactivate')
  async deactivateClient(id: string) {
    return await this.clientsService.deactivateClient(id);
  }

  @Get(':id/subscriptions')
  async getClientSubscriptions(id: string) {
    return await this.clientsService.getClientSubscriptions(id);
  }
}
