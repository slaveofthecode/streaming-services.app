# StreamSub - Frontend Astro

Frontend para el sistema de gestión de suscripciones a servicios de streaming construido con **Astro**, **TypeScript** y **Tailwind CSS**.

## Características

- **Dashboard**: Resumen de clientes, servicios, suscripciones e ingresos
- **Gestión de Servicios**: CRUD completo de servicios de streaming
- **Gestión de Clientes**: Administración de clientes y sus suscripciones
- **Billing**: Cálculo automático de cobros y registro de pagos
- **Historial**: Seguimiento completo de pagos y cambios de suscripciones

## Requisitos

- Node.js 18+ (recomendado 20.x)
- npm o yarn

## Instalación

### 1. Clonar y navegar al directorio

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y asegúrate de que la URL de la API sea correcta:

```bash
cp .env.example .env
```

Contenido del `.env`:

```
ASTRO_PUBLIC_API_URL=http://localhost:3001/api
```

Si tu backend está en un puerto diferente o en un servidor remoto, ajusta la URL.

## Desarrollo Local

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:3000**

Asegúrate de que:
- El backend NestJS está corriendo en `http://localhost:3001`
- La base de datos PostgreSQL está conectada y disponible

## Estructura del Proyecto

```
/frontend
├── src/
│   ├── pages/              # Páginas Astro (rutas automáticas)
│   │   ├── index.astro     # Dashboard
│   │   ├── servicios.astro # Gestión de servicios
│   │   ├── clientes.astro  # Gestión de clientes
│   │   ├── billing.astro   # Gestión de billing
│   │   └── clientes/[id].astro  # Detalle de cliente
│   ├── layouts/            # Layouts compartidos
│   │   └── BaseLayout.astro
│   ├── components/         # Componentes Astro reutilizables
│   │   ├── StatCard.astro
│   │   ├── Modal.astro
│   │   ├── Table.astro
│   │   └── Badge.astro
│   ├── types/              # Tipos TypeScript compartidos
│   │   └── index.ts
│   ├── utils/              # Utilidades
│   │   └── api.ts          # Cliente API
│   └── styles/             # Estilos globales
│       └── global.css
├── package.json
├── astro.config.mjs        # Configuración de Astro
├── tailwind.config.js      # Configuración de Tailwind
└── tsconfig.json           # Configuración de TypeScript

```

## Páginas Disponibles

### Dashboard (`/`)
Resumen general del sistema con estadísticas clave y acceso rápido a las principales funcionalidades.

### Servicios (`/servicios`)
- Listar todos los servicios disponibles
- Crear nuevos servicios
- Editar información de servicios
- Cambiar precios (aplica al próximo mes)
- Desactivar servicios

### Clientes (`/clientes`)
- Listar clientes registrados
- Crear nuevos clientes
- Ver detalle completo de cliente
- Gestionar suscripciones del cliente
- Ver historial de pagos

### Detalle de Cliente (`/clientes/:id`)
- Información completa del cliente
- Suscripciones activas
- Historial de pagos
- Opción de agregar nuevas suscripciones

### Billing (`/billing`)
- Cálculo automático de cobros mensuales
- Desglose por cliente
- Registro de pagos
- Filtrar por mes

## Cliente API

El archivo `src/utils/api.ts` contiene un cliente HTTP reutilizable para todas las llamadas a la API.

### Uso básico:

```typescript
import { apiClient } from '../utils/api';

// Obtener servicios
const services = await apiClient.getServices();

// Crear cliente
const newClient = await apiClient.createClient({
  name: 'Juan Pérez',
  email: 'juan@example.com',
  phone: '+34 600 123 456',
  address: 'Calle Principal 123'
});

// Registrar pago
const payment = await apiClient.recordPayment({
  clientId: 1,
  billingMonth: '2024-01',
  amount: 29.99
});
```

## Tipos TypeScript

Todos los tipos están definidos en `src/types/index.ts` e incluyen:

- `Service`: Servicio de streaming
- `Client`: Cliente registrado
- `Subscription`: Suscripción de cliente a servicio
- `Payment`: Registro de pago
- `BillingRecord`: Registro de facturación

## Estilos y Diseño

El proyecto utiliza **Tailwind CSS v4** con configuración personalizada:

- **Colores**: Primary (azul), Secondary (verde), Accent (ámbar)
- **Componentes**: Botones, inputs, cards, badges, modales
- **Responsivo**: Mobile-first con soporte para tablets y desktop

### Clases Personalizadas

```css
.btn           /* Botón base */
.btn-primary   /* Botón primario */
.btn-secondary /* Botón secundario */
.btn-outline   /* Botón outline */
.card          /* Tarjeta */
.input         /* Input de formulario */
.label         /* Label de formulario */
.badge         /* Badge/etiqueta */
```

## Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en `/dist`.

## Preview del Build

```bash
npm run build
npm run preview
```

## Validación y Tipos

Ejecuta la validación de TypeScript:

```bash
npm run check
```

## Variables de Entorno

| Variable | Descripción | Por defecto |
|----------|-------------|------------|
| `ASTRO_PUBLIC_API_URL` | URL base de la API | `http://localhost:3001/api` |

**Nota**: Las variables con prefijo `ASTRO_PUBLIC_` están disponibles en el cliente.

## Troubleshooting

### Error: "Cannot connect to API"
- Verifica que el backend está corriendo en `http://localhost:3001`
- Comprueba que `ASTRO_PUBLIC_API_URL` en `.env` es correcta
- Revisa la consola del navegador para errores CORS

### Error: "Cannot find module"
```bash
npm install
```

### Puerto 3000 ya está en uso
```bash
npm run dev -- --port 3001
```

## Deployment a Vercel

### Opción 1: GitHub

1. Sube el código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa el repositorio
4. Configura las variables de entorno
5. Deploy automático

### Opción 2: CLI de Vercel

```bash
npm i -g vercel
vercel
```

## Contacto y Soporte

Si tienes preguntas o problemas, revisa:
- La documentación del backend en `/backend/README.md`
- Los ejemplos de API en `/backend/API_EXAMPLES.md`

---

**Versión**: 1.0.0  
**Stack**: Astro + TypeScript + Tailwind CSS  
**Última actualización**: 2024
