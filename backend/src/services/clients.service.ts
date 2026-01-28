import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';

@Injectable()
export class ClientsService {
  private clientsRepository: Repository<Client>;

  constructor(clientsRepository: Repository<Client>) {
    this.clientsRepository = clientsRepository;
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientsRepository.create(createClientDto);
    return await this.clientsRepository.save(client);
  }

  async getAllClients(): Promise<Client[]> {
    return await this.clientsRepository.find({
      relations: ['subscriptions', 'payments'],
    });
  }

  async getClientById(id: string): Promise<Client> {
    return await this.clientsRepository.findOne({
      where: { id },
      relations: ['subscriptions', 'payments'],
    });
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    await this.clientsRepository.update(id, updateClientDto);
    return await this.getClientById(id);
  }

  async deactivateClient(id: string): Promise<Client> {
    return await this.updateClient(id, { isActive: false });
  }

  async getClientSubscriptions(clientId: string) {
    const client = await this.clientsRepository.findOne({
      where: { id: clientId },
      relations: ['subscriptions', 'subscriptions.service'],
    });
    return client?.subscriptions || [];
  }
}
