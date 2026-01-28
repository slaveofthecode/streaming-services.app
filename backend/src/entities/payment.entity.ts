import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ type: 'uuid' })
  clientId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  status: string; // 'pending', 'completed', 'failed', 'refunded'

  @Column({ type: 'varchar', length: 50, default: 'manual' })
  paymentMethod: string; // 'stripe', 'paypal', 'manual', etc.

  @Column({ type: 'varchar', length: 255, nullable: true })
  externalTransactionId: string;

  @Column({ type: 'date' })
  billingMonth: Date; // Mes al que corresponde el pago

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
