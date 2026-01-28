# Estructura Completa del Proyecto StreamSub

Documento de referencia rápida sobre la estructura del proyecto completo.

## Árbol de Carpetas

```
project-root/
│
├── backend/                          # Backend NestJS + PostgreSQL
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts
│   │   │
│   │   ├── controllers/              # Controladores REST
│   │   │   ├── services.controller.ts
│   │   │   ├── clients.controller.ts
│   │   │   ├── subscriptions.controller.ts
│   │   │   └── billing.controller.ts
│   │   │
│   │   ├── services/                 # Lógica de negocio
│   │   │   ├── services.service.ts
│   │   │   ├── clients.service.ts
│   │   │   ├── subscriptions.service.ts
│   │   │   └── billing.service.ts
│   │   │
│   │   ├── entities/                 # Modelos TypeORM
│   │   │   ├── service.entity.ts
│   │   │   ├── client.entity.ts
│   │   │   ├── subscription.entity.ts
│   │   │   ├── price-history.entity.ts
│   │   │   └── payment.entity.ts
│   │   │
│   │   ├── modules/                  # Módulos NestJS
│   │   │   ├── services.module.ts
│   │   │   ├── clients.module.ts
│   │   │   ├── subscriptions.module.ts
│   │   │   └── billing.module.ts
│   │   │
│   │   ├── dtos/                     # Data Transfer Objects
│   │   │   ├── service.dto.ts
│   │   │   ├── client.dto.ts
│   │   │   ├── subscription.dto.ts
│   │   │   └── payment.dto.ts
│   │   │
│   │   └── database/
│   │       └── data-source.ts        # Configuración TypeORM
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md                     # Documentación backend
│   ├── QUICKSTART.md                 # Guía rápida backend
│   └── API_EXAMPLES.md               # Ejemplos de uso API
│
├── frontend/                         # Frontend Astro
│   ├── src/
│   │   ├── pages/                    # Rutas automáticas (Astro)
│   │   │   ├── index.astro           # Dashboard
│   │   │   ├── servicios.astro       # Servicios
│   │   │   ├── clientes.astro        # Clientes
│   │   │   ├── billing.astro         # Billing
│   │   │   └── clientes/
│   │   │       └── [id].astro        # Detalle de cliente
│   │   │
│   │   ├── layouts/                  # Layouts compartidos
│   │   │   └── BaseLayout.astro      # Layout principal
│   │   │
│   │   ├── components/               # Componentes reutilizables
│   │   │   ├── StatCard.astro        # Tarjeta de estadísticas
│   │   │   ├── Modal.astro           # Modal genérico
│   │   │   ├── Table.astro           # Tabla reutilizable
│   │   │   └── Badge.astro           # Badge/etiqueta
│   │   │
│   │   ├── types/                    # Tipos TypeScript compartidos
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/                    # Utilidades
│   │   │   └── api.ts                # Cliente HTTP para API
│   │   │
│   │   └── styles/                   # Estilos
│   │       └── global.css            # Estilos globales + Tailwind
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── astro.config.mjs              # Configuración Astro
│   ├── tailwind.config.js            # Configuración Tailwind
│   ├── README.md                     # Documentación frontend
│   └── QUICKSTART.md                 # Guía rápida frontend
│
├── SETUP.md                          # Guía completa de setup
└── PROJECT_STRUCTURE.md              # Este archivo

```

## Archivos Clave

### Backend (NestJS)

| Archivo | Descripción |
|---------|-------------|
| `src/main.ts` | Punto de entrada de la aplicación |
| `src/app.module.ts` | Módulo raíz que importa todos los demás módulos |
| `src/database/data-source.ts` | Configuración de TypeORM y PostgreSQL |
| `src/entities/*.entity.ts` | Modelos de base de datos |
| `src/controllers/*.controller.ts` | Endpoints REST |
| `src/services/*.service.ts` | Lógica de negocio |
| `src/dtos/*.dto.ts` | Esquemas de validación |
| `src/modules/*.module.ts` | Módulos NestJS |

### Frontend (Astro)

| Archivo | Descripción |
|---------|-------------|
| `src/pages/index.astro` | Dashboard principal |
| `src/pages/*.astro` | Páginas (rutas automáticas) |
| `src/layouts/BaseLayout.astro` | Template compartido |
| `src/components/*.astro` | Componentes reutilizables |
| `src/types/index.ts` | Tipos TypeScript |
| `src/utils/api.ts` | Cliente HTTP |
| `src/styles/global.css` | Estilos globales |
| `tailwind.config.js` | Configuración de Tailwind |
| `astro.config.mjs` | Configuración de Astro |

---

## Modelos de Datos

### Service (Servicio)
```typescript
{
  id: number;
  name: string;              // "Netflix", "Spotify"
  description: string;
  currentPrice: number;      // Precio actual
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Client (Cliente)
```typescript
{
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Subscription (Suscripción)
```typescript
{
  id: number;
  clientId: number;
  serviceId: number;
  status: 'active' | 'paused' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Payment (Pago)
```typescript
{
  id: number;
  clientId: number;
  billingMonth: string;      // "2024-01"
  amount: number;            // Total a cobrar
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  paidDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### PriceHistory (Historial de Precios)
```typescript
{
  id: number;
  serviceId: number;
  price: number;
  effectiveFrom: Date;       // Cuándo aplica el precio
  createdAt: Date;
}
```

---

## Endpoints de la API

### Servicios
- `GET /api/services` - Listar todos
- `POST /api/services` - Crear
- `PUT /api/services/:id` - Actualizar
- `PATCH /api/services/:id/deactivate` - Desactivar

### Clientes
- `GET /api/clients` - Listar todos
- `GET /api/clients/:id` - Obtener uno
- `POST /api/clients` - Crear
- `PUT /api/clients/:id` - Actualizar
- `DELETE /api/clients/:id` - Eliminar

### Suscripciones
- `GET /api/subscriptions` - Listar todas
- `GET /api/subscriptions/client/:clientId` - Suscripciones de un cliente
- `POST /api/subscriptions` - Crear
- `PATCH /api/subscriptions/:id` - Cambiar estado

### Billing
- `GET /api/billing/monthly` - Billing mensual completo
- `GET /api/billing/monthly?month=2024-01` - Mes específico
- `GET /api/billing/client/:clientId` - Billing de un cliente
- `POST /api/billing/payment` - Registrar pago
- `GET /api/billing/payments` - Listar pagos
- `GET /api/billing/client/:clientId/payments` - Pagos de un cliente

---

## Flujo de Datos

```
Frontend (Astro/TypeScript)
         ↓
     [Astro Pages]
         ↓
  [API Client Module]
         ↓
    [HTTP Requests]
         ↓
  Backend (NestJS)
         ↓
  [Controllers]
         ↓
  [Services]
         ↓
  [TypeORM Entities]
         ↓
  [PostgreSQL Database]
```

---

## Página a Página

### Dashboard (`/`)
**Propósito**: Resumen del sistema
- Estadísticas clave (clientes, suscripciones, ingresos)
- Acceso rápido a funcionalidades
- Estado del sistema

**Datos que consume**:
- Total de clientes
- Suscripciones activas
- Total de servicios
- Ingresos mensuales

### Servicios (`/servicios`)
**Propósito**: Gestionar servicios de streaming
- Listar servicios
- Crear nuevos
- Editar información
- Cambiar precios
- Desactivar servicios

**Datos que consume**:
- Lista de servicios
- Crear/actualizar/desactivar servicio

### Clientes (`/clientes`)
**Propósito**: Gestionar clientes
- Listar clientes
- Crear nuevos
- Ver detalles
- Acceso a suscripciones y pagos

**Datos que consume**:
- Lista de clientes
- Crear cliente

### Detalle de Cliente (`/clientes/:id`)
**Propósito**: Vista completa del cliente
- Información del cliente
- Suscripciones activas
- Historial de pagos
- Opción de agregar suscripciones

**Datos que consume**:
- Datos del cliente
- Suscripciones del cliente
- Pagos del cliente
- Lista de servicios (para nuevas suscripciones)

### Billing (`/billing`)
**Propósito**: Gestión de facturación
- Cálculo automático mensual
- Desglose por cliente
- Registro de pagos
- Filtrar por mes

**Datos que consume**:
- Datos de billing mensual
- Crear registro de pago

---

## Tecnologías por Capa

### Base de Datos
- PostgreSQL 12+
- TypeORM (ORM)

### Backend
- NestJS 10.x
- TypeScript
- Node.js 18+

### Frontend
- Astro 4.x
- TypeScript
- Tailwind CSS 4.x

### DevOps
- npm/yarn
- Git

---

## Características Principales

✅ CRUD completo de servicios
✅ CRUD completo de clientes
✅ Sistema de suscripciones flexible
✅ Cambio de precios con efectividad futura
✅ Cálculo automático de billing
✅ Registro y seguimiento de pagos
✅ Historial completo de transacciones
✅ Sistema de estados (activo, pausado, cancelado)
✅ Validación de datos en ambas capas
✅ Interfaz responsiva (mobile-friendly)

---

## Guías de Referencia Rápida

### Para Desarrolladores Backend
1. Lee `/backend/README.md`
2. Lee `/backend/QUICKSTART.md`
3. Lee `/backend/API_EXAMPLES.md`

### Para Desarrolladores Frontend
1. Lee `/frontend/README.md`
2. Lee `/frontend/QUICKSTART.md`
3. Explora `src/pages/` para entender rutas

### Para DevOps/Deployment
1. Lee `/SETUP.md`
2. Lee `/backend/README.md` (sección Deployment)
3. Lee `/frontend/README.md` (sección Deployment)

---

## Convenciones del Código

### Nombres
- **Entidades**: Singular (`User`, `Service`)
- **Tablas**: Plural (`users`, `services`)
- **Archivos**: kebab-case (`user.entity.ts`, `user.controller.ts`)
- **Clases**: PascalCase (`UserService`, `UserController`)
- **Variables**: camelCase (`userName`, `totalAmount`)

### Estructura
- Una entidad = un archivo
- Un servicio = un archivo
- Un controlador = un archivo
- DTOs agrupados en carpeta `dtos/`

---

## Variables de Entorno

### Backend (`.env`)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=streaming_subscriptions
NODE_ENV=development
PORT=3001
```

### Frontend (`.env`)
```env
ASTRO_PUBLIC_API_URL=http://localhost:3001/api
```

---

**Última actualización**: 2024  
**Versión del proyecto**: 1.0.0
