import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { BillingService } from '../services/billing.service';
import { CreatePaymentDto, UpdatePaymentStatusDto } from '../dtos/payment.dto';

@Controller('api/billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('client/:clientId')
  async calculateClientMonthlyBilling(clientId: string) {
    return await this.billingService.calculateClientMonthlyBilling(clientId);
  }

  @Get('all')
  async calculateAllClientsBilling() {
    return await this.billingService.calculateAllClientsBilling();
  }

  @Post('payment')
  async recordPayment(createPaymentDto: CreatePaymentDto) {
    return await this.billingService.recordPayment(createPaymentDto);
  }

  @Get('payments/client/:clientId')
  async getClientPaymentHistory(clientId: string) {
    return await this.billingService.getClientPaymentHistory(clientId);
  }

  @Get('payments/monthly')
  async getMonthlyPayments(year: number, month: number) {
    return await this.billingService.getMonthlyPayments(year, month);
  }

  @Get('payments/summary')
  async getMonthlyPaymentsSummary(year: number, month: number) {
    return await this.billingService.getMonthlyPaymentsSummary(year, month);
  }

  @Get('payments/pending')
  async getPendingPayments() {
    return await this.billingService.getPendingPayments();
  }

  @Put('payments/:paymentId/status')
  async updatePaymentStatus(paymentId: string, updateStatusDto: UpdatePaymentStatusDto) {
    return await this.billingService.updatePaymentStatus(paymentId, updateStatusDto.status);
  }
}
