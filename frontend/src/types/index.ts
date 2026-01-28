export interface Service {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: number;
  clientId: number;
  serviceId: number;
  status: 'active' | 'paused' | 'cancelled';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceHistory {
  id: number;
  serviceId: number;
  price: number;
  effectiveFrom: string;
  createdAt: string;
}

export interface Payment {
  id: number;
  clientId: number;
  billingMonth: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingRecord {
  clientId: number;
  clientName: string;
  billingMonth: string;
  totalAmount: number;
  services: BillingItem[];
}

export interface BillingItem {
  serviceId: number;
  serviceName: string;
  price: number;
}

export interface ClientWithSubscriptions extends Client {
  subscriptions: (Subscription & { service: Service })[];
}

export interface BillingReport {
  totalAmount: number;
  clientCount: number;
  activeSubscriptions: number;
  records: BillingRecord[];
}
