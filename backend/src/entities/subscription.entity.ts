import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from './service.entity';
import { Client } from './client.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ type: 'uuid' })
  clientId: string;

  @ManyToOne(() => Service, (service) => service.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ type: 'uuid' })
  serviceId: string;

  @Column({ type: 'enum', enum: ['active', 'paused', 'cancelled'], default: 'active' })
  status: 'active' | 'paused' | 'cancelled';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceAtSubscription: number;

  @CreateDateColumn()
  subscribedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date;
}
