const API_URL = import.meta.env.ASTRO_PUBLIC_API_URL || 'http://localhost:3001/api';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP ${response.status}`,
      }));
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Services
  async getServices() {
    return this.request('/services');
  }

  async createService(data: {
    name: string;
    description: string;
    currentPrice: number;
  }) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(
    id: number,
    data: {
      name?: string;
      description?: string;
      currentPrice?: number;
    }
  ) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deactivateService(id: number) {
    return this.request(`/services/${id}/deactivate`, {
      method: 'PATCH',
    });
  }

  // Clients
  async getClients() {
    return this.request('/clients');
  }

  async getClient(id: number) {
    return this.request(`/clients/${id}`);
  }

  async createClient(data: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  }) {
    return this.request('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateClient(
    id: number,
    data: {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
    }
  ) {
    return this.request(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteClient(id: number) {
    return this.request(`/clients/${id}`, {
      method: 'DELETE',
    });
  }

  // Subscriptions
  async getSubscriptions() {
    return this.request('/subscriptions');
  }

  async getClientSubscriptions(clientId: number) {
    return this.request(`/subscriptions/client/${clientId}`);
  }

  async createSubscription(data: {
    clientId: number;
    serviceId: number;
  }) {
    return this.request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSubscriptionStatus(
    id: number,
    status: 'active' | 'paused' | 'cancelled'
  ) {
    return this.request(`/subscriptions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Billing
  async calculateMonthlyBilling(month?: string) {
    const endpoint = month
      ? `/billing/monthly?month=${month}`
      : '/billing/monthly';
    return this.request(endpoint);
  }

  async getClientBilling(clientId: number, month?: string) {
    const endpoint = month
      ? `/billing/client/${clientId}?month=${month}`
      : `/billing/client/${clientId}`;
    return this.request(endpoint);
  }

  async recordPayment(data: {
    clientId: number;
    billingMonth: string;
    amount: number;
  }) {
    return this.request('/billing/payment', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPayments() {
    return this.request('/billing/payments');
  }

  async getClientPayments(clientId: number) {
    return this.request(`/billing/client/${clientId}/payments`);
  }
}

export const apiClient = new ApiClient();
