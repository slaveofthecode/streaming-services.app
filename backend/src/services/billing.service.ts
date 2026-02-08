import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { Subscription } from '../entities/subscription.entity';
import { Client } from '../entities/client.entity';
import { Service } from '../entities/service.entity';
import { CreatePaymentDto } from '../dtos/payment.dto';

interface ClientBilling {
  clientId: string;
  clientName: string;
  totalAmount: number;
  services: {
    serviceName: string;
    price: number;
    status: string;
  }[];
}

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  /**
   * Calcula el total a cobrar a un cliente específico en el mes actual
   */
  async calculateClientMonthlyBilling(clientId: string): Promise<ClientBilling> {
    const client = await this.clientsRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new Error('Client not found');
    }

    const subscriptions = await this.subscriptionsRepository.find({
      where: { clientId, status: 'active' },
      relations: ['service'],
    });

    let totalAmount = 0;
    const services = subscriptions.map((sub) => {
      totalAmount += parseFloat(sub.service.currentPrice.toString());
      return {
        serviceName: sub.service.name,
        price: parseFloat(sub.service.currentPrice.toString()),
        status: sub.status,
      };
    });

    return {
      clientId,
      clientName: client.name,
      totalAmount,
      services,
    };
  }

  /**
   * Calcula el total a cobrar a todos los clientes en el mes actual
   */
  async calculateAllClientsBilling(): Promise<ClientBilling[]> {
    const clients = await this.clientsRepository.find();
    const billings = [];

    for (const client of clients) {
      const billing = await this.calculateClientMonthlyBilling(client.id);
      if (billing.services.length > 0) {
        billings.push(billing);
      }
    }

    return billings;
  }

  /**
   * Registra un pago realizado
   */
  async recordPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const client = await this.clientsRepository.findOne({
      where: { id: createPaymentDto.clientId },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    const payment = this.paymentsRepository.create({
      client,
      ...createPaymentDto,
    });

    return await this.paymentsRepository.save(payment);
  }

  /**
   * Obtiene el historial de pagos de un cliente
   */
  async getClientPaymentHistory(clientId: string): Promise<Payment[]> {
    return await this.paymentsRepository.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Obtiene los pagos de un mes específico
   */
  async getMonthlyPayments(year: number, month: number): Promise<Payment[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    return await this.paymentsRepository.find({
      where: {
        billingMonth: Between(startDate, endDate),
      },
      relations: ['client'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Obtiene un resumen de pagos por cliente en un mes
   */
  async getMonthlyPaymentsSummary(
    year: number,
    month: number,
  ): Promise<{ clientName: string; totalPaid: number; payments: Payment[] }[]> {
    const payments = await this.getMonthlyPayments(year, month);

    const summary = new Map<
      string,
      { clientName: string; totalPaid: number; payments: Payment[] }
    >();

    for (const payment of payments) {
      let record = summary.get(payment.clientId);
      if (!record) {
        record = {
          clientName: payment.client.name,
          totalPaid: 0,
          payments: [],
        };
        summary.set(payment.clientId, record);
      }

      record.totalPaid += parseFloat(payment.amount.toString());
      record.payments.push(payment);
    }

    return Array.from(summary.values());
  }

  /**
   * Obtiene los pagos pendientes
   */
  async getPendingPayments(): Promise<Payment[]> {
    return await this.paymentsRepository.find({
      where: { status: 'pending' },
      relations: ['client'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Actualiza el estado de un pago
   */
  async updatePaymentStatus(
    paymentId: string,
    status: string,
  ): Promise<Payment> {
    await this.paymentsRepository.update(paymentId, { status });
    const payment = await this.paymentsRepository.findOne({ where: { id: paymentId } });
    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  }
}
