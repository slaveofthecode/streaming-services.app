# API de Gestión de Suscripciones de Streaming

Sistema backend profesional para gestionar suscripciones a servicios de streaming, clientes, pagos e historial de precios.

## Características

- ✅ Gestión de servicios de streaming con precios dinámicos
- ✅ Registro y gestión de clientes
- ✅ Sistema de suscripciones flexible (activas, pausadas, canceladas)
- ✅ Historial completo de cambios de precios
- ✅ Sistema de billing y registro de pagos
- ✅ Cálculo automático de montos a cobrar por cliente
- ✅ Reportes de pagos mensuales
- ✅ PostgreSQL + TypeORM para persistencia de datos

## Requisitos

- Node.js 18+
- PostgreSQL 12+
- npm o yarn

## Instalación Local

### 1. Clonar el proyecto y navegar al backend

```bash
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar PostgreSQL

Asegúrate de tener PostgreSQL instalado y ejecutándose. Crea una base de datos:

```sql
CREATE DATABASE streaming_subscriptions;
```

### 4. Configurar variables de entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=streaming_subscriptions
API_PORT=3001
NODE_ENV=development
```

### 5. Ejecutar las migraciones (opcional)

```bash
npm run migration:run
```

### 6. Iniciar el servidor

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3001`

Verifica que funcione visitando:

- `http://localhost:3001` - Mensaje de bienvenida
- `http://localhost:3001/health` - Health check

## API Endpoints

### Servicios

#### Crear servicio

```http
POST /api/services
Content-Type: application/json

{
  "name": "Netflix",
  "description": "Servicio de streaming de películas",
  "currentPrice": 99.99,
  "billingCycle": "monthly"
}
```

#### Obtener todos los servicios

```http
GET /api/services
```

#### Obtener servicio por ID

```http
GET /api/services/:id
```

#### Actualizar precio de servicio

```http
PUT /api/services/:id/price
Content-Type: application/json

{
  "newPrice": 109.99,
  "reason": "Aumento anual de precios"
}
```

#### Obtener historial de precios

```http
GET /api/services/:id/price-history
```

#### Desactivar servicio

```http
PUT /api/services/:id/deactivate
```

---

### Clientes

#### Crear cliente

```http
POST /api/clients
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+34600000000",
  "address": "Calle Principal 123"
}
```

#### Obtener todos los clientes

```http
GET /api/clients
```

#### Obtener cliente por ID

```http
GET /api/clients/:id
```

#### Actualizar cliente

```http
PUT /api/clients/:id
Content-Type: application/json

{
  "name": "Juan Carlos Pérez",
  "email": "juancarlos@example.com"
}
```

#### Obtener suscripciones del cliente

```http
GET /api/clients/:id/subscriptions
```

#### Desactivar cliente

```http
PUT /api/clients/:id/deactivate
```

---

### Suscripciones

#### Crear suscripción (cliente se suscribe a servicio)

```http
POST /api/subscriptions
Content-Type: application/json

{
  "clientId": "uuid-del-cliente",
  "serviceId": "uuid-del-servicio"
}
```

#### Obtener suscripciones activas del cliente

```http
GET /api/subscriptions/client/:clientId
```

#### Obtener todas las suscripciones activas

```http
GET /api/subscriptions/active
```

#### Cancelar suscripción

```http
PUT /api/subscriptions/:id/cancel
Content-Type: application/json

{
  "reason": "Usuario solicita cancelación"
}
```

#### Pausar suscripción

```http
PUT /api/subscriptions/:id/pause
```

#### Reanudar suscripción

```http
PUT /api/subscriptions/:id/resume
```

---

### Billing (Facturación)

#### Calcular total a cobrar a un cliente este mes

```http
GET /api/billing/client/:clientId
```

Respuesta:

```json
{
	"clientId": "uuid",
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

#### Calcular total a cobrar a todos los clientes

```http
GET /api/billing/all
```

#### Registrar pago

```http
POST /api/billing/payment
Content-Type: application/json

{
  "clientId": "uuid-del-cliente",
  "amount": 209.98,
  "status": "completed",
  "paymentMethod": "manual",
  "billingMonth": "2026-01-01",
  "notes": "Pago realizado por transferencia bancaria"
}
```

#### Obtener historial de pagos de un cliente

```http
GET /api/billing/payments/client/:clientId
```

#### Obtener pagos de un mes específico

```http
GET /api/billing/payments/monthly?year=2026&month=1
```

#### Obtener resumen de pagos de un mes

```http
GET /api/billing/payments/summary?year=2026&month=1
```

#### Obtener pagos pendientes

```http
GET /api/billing/payments/pending
```

#### Actualizar estado de pago

```http
PUT /api/billing/payments/:paymentId/status
Content-Type: application/json

{
  "status": "completed"
}
```

---

## Estructura de Base de Datos

### Tablas

**services** - Servicios de streaming

- `id` (UUID)
- `name` (string)
- `description` (text)
- `currentPrice` (decimal)
- `billingCycle` (string)
- `isActive` (boolean)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**clients** - Clientes

- `id` (UUID)
- `name` (string)
- `email` (string, unique)
- `phone` (string)
- `address` (text)
- `isActive` (boolean)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**subscriptions** - Suscripciones de clientes

- `id` (UUID)
- `clientId` (UUID, FK)
- `serviceId` (UUID, FK)
- `status` (enum: active, paused, cancelled)
- `priceAtSubscription` (decimal)
- `subscribedAt` (timestamp)
- `cancelledAt` (timestamp)
- `updatedAt` (timestamp)

**price_histories** - Historial de cambios de precio

- `id` (UUID)
- `serviceId` (UUID, FK)
- `oldPrice` (decimal)
- `newPrice` (decimal)
- `reason` (string)
- `changedAt` (timestamp)
- `effectiveFrom` (timestamp)

**payments** - Registro de pagos

- `id` (UUID)
- `clientId` (UUID, FK)
- `amount` (decimal)
- `status` (string)
- `paymentMethod` (string)
- `externalTransactionId` (string)
- `billingMonth` (date)
- `notes` (text)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

---

## Flujo de Uso Típico

### 1. Crear servicios

```bash
POST /api/services
```

### 2. Registrar clientes

```bash
POST /api/clients
```

### 3. Los clientes se suscriben a servicios

```bash
POST /api/subscriptions
```

### 4. Consultar lo que se debe cobrar cada mes

```bash
GET /api/billing/all
```

### 5. Registrar pagos

```bash
POST /api/billing/payment
```

### 6. Consultar reportes

```bash
GET /api/billing/payments/summary?year=2026&month=1
```

### 7. Cambiar precio de servicio (afecta próximo mes)

```bash
PUT /api/services/:id/price
```

---

## Conectar desde Astro

Desde tu frontend en Astro, haz requests así:

```javascript
// Ejemplo: Obtener todos los servicios
const response = await fetch('http://localhost:3001/api/services');
const services = await response.json();
console.log(services);

// Ejemplo: Crear una suscripción
const subscriptionResponse = await fetch(
	'http://localhost:3001/api/subscriptions',
	{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			clientId: 'uuid-cliente',
			serviceId: 'uuid-servicio',
		}),
	}
);
```

---

## Desarrollo

### Scripts útiles

```bash
# Iniciar en modo desarrollo (hot reload)
npm run start:dev

# Compilar para producción
npm build

# Ejecutar en producción
npm run start:prod

# Linter
npm run lint

# Tests
npm test
```

---

## Deployment a Vercel

1. Configura PostgreSQL en Vercel (o usa un proveedor externo como Neon)
2. Sube el código a GitHub
3. Conecta el repositorio en Vercel
4. Configura las variables de entorno
5. Deploy

---

## Licencia

MIT
