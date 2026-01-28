# Ejemplos de Uso de la API

Ejemplos completos en curl, JavaScript/Fetch y Astro para todas las operaciones principales.

---

## 1. SERVICIOS

### Crear servicio

**Curl:**
```bash
curl -X POST http://localhost:3001/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Netflix",
    "description": "Películas y series en streaming",
    "currentPrice": 99.99,
    "billingCycle": "monthly"
  }'
```

**JavaScript:**
```javascript
const service = await fetch('http://localhost:3001/api/services', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Netflix',
    description: 'Películas y series en streaming',
    currentPrice: 99.99,
    billingCycle: 'monthly'
  })
}).then(r => r.json());

console.log('Servicio creado:', service);
```

### Obtener todos los servicios

**Curl:**
```bash
curl http://localhost:3001/api/services
```

**JavaScript:**
```javascript
const services = await fetch('http://localhost:3001/api/services')
  .then(r => r.json());

console.log('Servicios:', services);
```

### Actualizar precio de servicio

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/services/{serviceId}/price \
  -H "Content-Type: application/json" \
  -d '{
    "newPrice": 109.99,
    "reason": "Aumento de precios anual"
  }'
```

**JavaScript:**
```javascript
const updated = await fetch(`http://localhost:3001/api/services/${serviceId}/price`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    newPrice: 109.99,
    reason: 'Aumento de precios anual'
  })
}).then(r => r.json());
```

### Obtener historial de precios

**Curl:**
```bash
curl http://localhost:3001/api/services/{serviceId}/price-history
```

---

## 2. CLIENTES

### Crear cliente

**Curl:**
```bash
curl -X POST http://localhost:3001/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez García",
    "email": "juan@example.com",
    "phone": "+34600000000",
    "address": "Calle Principal 123, Madrid"
  }'
```

**JavaScript:**
```javascript
const client = await fetch('http://localhost:3001/api/clients', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez García',
    email: 'juan@example.com',
    phone: '+34600000000',
    address: 'Calle Principal 123, Madrid'
  })
}).then(r => r.json());

console.log('Cliente creado:', client);
```

### Obtener todos los clientes

**Curl:**
```bash
curl http://localhost:3001/api/clients
```

### Actualizar cliente

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/clients/{clientId} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez García",
    "phone": "+34600111111"
  }'
```

### Obtener suscripciones del cliente

**Curl:**
```bash
curl http://localhost:3001/api/clients/{clientId}/subscriptions
```

---

## 3. SUSCRIPCIONES

### Cliente se suscribe a un servicio

**Curl:**
```bash
curl -X POST http://localhost:3001/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "550e8400-e29b-41d4-a716-446655440000",
    "serviceId": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

**JavaScript:**
```javascript
const subscription = await fetch('http://localhost:3001/api/subscriptions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientId: '550e8400-e29b-41d4-a716-446655440000',
    serviceId: '550e8400-e29b-41d4-a716-446655440001'
  })
}).then(r => r.json());

console.log('Suscripción creada:', subscription);
```

### Obtener suscripciones activas de un cliente

**Curl:**
```bash
curl http://localhost:3001/api/subscriptions/client/{clientId}
```

### Cancelar suscripción

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/subscriptions/{subscriptionId}/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Cliente solicita cancelación"
  }'
```

### Pausar suscripción

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/subscriptions/{subscriptionId}/pause
```

### Reanudar suscripción

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/subscriptions/{subscriptionId}/resume
```

---

## 4. BILLING (FACTURACIÓN)

### Calcular total a cobrar a UN cliente este mes

**Curl:**
```bash
curl http://localhost:3001/api/billing/client/{clientId}
```

**Respuesta esperada:**
```json
{
  "clientId": "550e8400-e29b-41d4-a716-446655440000",
  "clientName": "Juan Pérez",
  "totalAmount": 209.98,
  "services": [
    {
      "serviceName": "Netflix",
      "price": 99.99,
      "status": "active"
    },
    {
      "serviceName": "Spotify",
      "price": 109.99,
      "status": "active"
    }
  ]
}
```

**JavaScript:**
```javascript
const billing = await fetch(`http://localhost:3001/api/billing/client/${clientId}`)
  .then(r => r.json());

console.log(`Total a cobrar a ${billing.clientName}: $${billing.totalAmount}`);
console.log('Servicios activos:', billing.services);
```

### Calcular total a cobrar a TODOS los clientes

**Curl:**
```bash
curl http://localhost:3001/api/billing/all
```

**Respuesta esperada:**
```json
[
  {
    "clientId": "550e8400-e29b-41d4-a716-446655440000",
    "clientName": "Juan Pérez",
    "totalAmount": 209.98,
    "services": [...]
  },
  {
    "clientId": "550e8400-e29b-41d4-a716-446655440002",
    "clientName": "María García",
    "totalAmount": 99.99,
    "services": [...]
  }
]
```

### Registrar pago de cliente

**Curl:**
```bash
curl -X POST http://localhost:3001/api/billing/payment \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 209.98,
    "status": "completed",
    "paymentMethod": "manual",
    "billingMonth": "2026-01-01",
    "notes": "Pago realizado vía transferencia bancaria"
  }'
```

**JavaScript:**
```javascript
const payment = await fetch('http://localhost:3001/api/billing/payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientId: '550e8400-e29b-41d4-a716-446655440000',
    amount: 209.98,
    status: 'completed',
    paymentMethod: 'manual',
    billingMonth: new Date(),
    notes: 'Pago realizado vía transferencia bancaria'
  })
}).then(r => r.json());

console.log('Pago registrado:', payment);
```

### Obtener historial de pagos de un cliente

**Curl:**
```bash
curl http://localhost:3001/api/billing/payments/client/{clientId}
```

### Obtener pagos de un mes específico

**Curl:**
```bash
curl "http://localhost:3001/api/billing/payments/monthly?year=2026&month=1"
```

### Obtener resumen de pagos del mes

**Curl:**
```bash
curl "http://localhost:3001/api/billing/payments/summary?year=2026&month=1"
```

**Respuesta esperada:**
```json
[
  {
    "clientName": "Juan Pérez",
    "totalPaid": 209.98,
    "payments": [
      {
        "id": "550e8400...",
        "amount": 209.98,
        "status": "completed",
        "createdAt": "2026-01-15T10:30:00Z"
      }
    ]
  }
]
```

### Obtener pagos pendientes

**Curl:**
```bash
curl http://localhost:3001/api/billing/payments/pending
```

### Actualizar estado de pago

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/billing/payments/{paymentId}/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

---

## 5. EJEMPLO COMPLETO: ASTRO

Integración desde Astro para obtener y mostrar datos:

```astro
---
// src/pages/dashboard.astro
---

<script>
import { onMounted, useState } from 'react';

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [billing, setBilling] = useState(null);

  onMounted(async () => {
    // Cargar todos los clientes
    const response = await fetch('http://localhost:3001/api/clients');
    const data = await response.json();
    setClients(data);
  });

  const handleSelectClient = async (clientId) => {
    setSelectedClient(clientId);
    
    // Cargar billing del cliente
    const response = await fetch(`http://localhost:3001/api/billing/client/${clientId}`);
    const data = await response.json();
    setBilling(data);
  };

  return (
    <div>
      <h1>Dashboard de Facturación</h1>

      <div>
        <h2>Clientes</h2>
        {clients.map((client) => (
          <button key={client.id} onClick={() => handleSelectClient(client.id)}>
            {client.name}
          </button>
        ))}
      </div>

      {billing && (
        <div>
          <h2>{billing.clientName}</h2>
          <p>Total a cobrar: ${billing.totalAmount}</p>
          
          <h3>Servicios activos:</h3>
          <ul>
            {billing.services.map((service) => (
              <li key={service.serviceName}>
                {service.serviceName} - ${service.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
</script>
```

---

## Notas importantes

- Reemplaza `{clientId}`, `{serviceId}`, etc. con IDs reales
- Los IDs son UUIDs (strings)
- Las fechas se envían en formato ISO 8601 (ej: 2026-01-01)
- Todos los montos están en la divisa que uses (asume decimales)
- CORS está habilitado para localhost (puertos 3000-3003)

---

Happy coding!
