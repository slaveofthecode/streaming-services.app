# StreamSub - Guía Completa de Setup

Sistema completo de gestión de suscripciones a servicios de streaming. Esta guía te ayudará a levantar tanto el backend como el frontend en tu máquina local.

## Requisitos Globales

- **Node.js**: 18+ (recomendado 20.x) - [Descargar](https://nodejs.org/)
- **PostgreSQL**: 12+ - [Descargar](https://www.postgresql.org/download/)
- **npm** o **yarn** (incluido con Node.js)
- **Git** (opcional, para clonar)

## Estructura del Proyecto

```
project-root/
├── backend/          # NestJS + PostgreSQL
│   ├── src/
│   ├── package.json
│   ├── README.md
│   └── QUICKSTART.md
└── frontend/         # Astro + TypeScript + Tailwind
    ├── src/
    ├── package.json
    ├── README.md
    └── QUICKSTART.md
```

---

## PARTE 1: Backend (NestJS + PostgreSQL)

### Paso 1: Preparar la Base de Datos

```bash
# Abre PostgreSQL (en Windows usa psql, en macOS/Linux usa psql)
psql -U postgres

# Crea la base de datos
CREATE DATABASE streaming_subscriptions;

# Verifica que se creó
\l

# Sal de psql
\q
```

### Paso 2: Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### Paso 3: Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env
```

Abre `.env` y verifica:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña  # Usa la contraseña que pusiste en PostgreSQL
DB_NAME=streaming_subscriptions

NODE_ENV=development
PORT=3001
```

### Paso 4: Iniciar el Backend

```bash
# En la carpeta /backend
npm run start:dev
```

Deberías ver:
```
[NestFactory] Starting Nest application...
[InstanceLoader] TypeOrmModule dependencies initialized 9ms
[RoutesResolver] StreamSubscriptionsController {/api/services}: true
[RouterExplorer] Mapped {/api/services, GET} route +2ms
...
[NestApplication] Nest application successfully started
```

El backend estará corriendo en: **http://localhost:3001**

Deja esta terminal abierta.

---

## PARTE 2: Frontend (Astro)

Abre **otra terminal** (en otra carpeta o en split screen).

### Paso 1: Instalar Dependencias del Frontend

```bash
cd frontend
npm install
```

### Paso 2: Configurar Variables de Entorno

```bash
cp .env.example .env
```

Abre `.env` y verifica:

```env
ASTRO_PUBLIC_API_URL=http://localhost:3001/api
```

### Paso 3: Iniciar el Frontend

```bash
# En la carpeta /frontend
npm run dev
```

Deberías ver:
```
  ▶ start
    Listening on http://localhost:3000
    ready in 1234ms
```

El frontend estará en: **http://localhost:3000**

---

## ¡Tu Aplicación está Lista!

Abre tu navegador y ve a: **http://localhost:3000**

### Terminal 1 (Backend)
```bash
cd backend
npm run start:dev
```

### Terminal 2 (Frontend)
```bash
cd frontend
npm run dev
```

Ambas deben estar corriendo simultáneamente.

---

## Primeras Acciones

Sigue estos pasos para probar que todo funciona:

### 1. Crear un Servicio
1. Ve a http://localhost:3000/servicios
2. Haz clic en "+ Nuevo Servicio"
3. Rellena:
   - Nombre: "Netflix"
   - Descripción: "Servicio de streaming de películas y series"
   - Precio: 9.99
4. Haz clic en "Guardar"

### 2. Crear un Cliente
1. Ve a http://localhost:3000/clientes
2. Haz clic en "+ Nuevo Cliente"
3. Rellena:
   - Nombre: "Juan Pérez"
   - Email: "juan@example.com"
   - Teléfono: "+34 600 123 456"
4. Haz clic en "Guardar"

### 3. Suscribir Cliente a Servicio
1. En http://localhost:3000/clientes, haz clic en "Ver" del cliente
2. Haz clic en "+ Nueva Suscripción"
3. Selecciona "Netflix"
4. Haz clic en "Suscribir"

### 4. Ver Billing
1. Ve a http://localhost:3000/billing
2. Deberías ver el cliente con $9.99 a cobrar
3. Haz clic en "Registrar Pago"
4. Ingresa $9.99
5. Haz clic en "Registrar Pago"

### 5. Ver Dashboard
1. Ve a http://localhost:3000
2. Deberías ver:
   - 1 cliente activo
   - 1 suscripción activa
   - 1 servicio
   - $9.99 en ingresos

¡Listo! Tu sistema está funcionando.

---

## Documentación Detallada

- **Backend**: Lee [/backend/README.md](/backend/README.md)
- **Backend Quickstart**: Lee [/backend/QUICKSTART.md](/backend/QUICKSTART.md)
- **Backend API Examples**: Lee [/backend/API_EXAMPLES.md](/backend/API_EXAMPLES.md)
- **Frontend**: Lee [/frontend/README.md](/frontend/README.md)
- **Frontend Quickstart**: Lee [/frontend/QUICKSTART.md](/frontend/QUICKSTART.md)

---

## Detener la Aplicación

Para detener el backend o frontend, presiona **Ctrl+C** en la terminal correspondiente.

---

## Problemas Comunes

### Error: "EADDRINUSE: address already in use :::3001"
El puerto 3001 ya está en uso. Cambia el puerto en `.env` del backend:
```env
PORT=3002
```
Y actualiza el frontend `.env`:
```env
ASTRO_PUBLIC_API_URL=http://localhost:3002/api
```

### Error: "Cannot connect to database"
Verifica:
1. PostgreSQL está corriendo
2. Las credenciales en `/backend/.env` son correctas
3. La base de datos `streaming_subscriptions` existe

```bash
psql -U postgres
\l  # Lista las bases de datos
```

### Error: "Cannot find module"
```bash
# Reinstala las dependencias
npm install
```

### Página en blanco en el frontend
Abre la consola del navegador (F12) y revisa los errores. Usualmente es porque la API no está accesible.

---

## Stack Tecnológico

### Backend
- **NestJS** 10.0.0 - Framework Node.js progresivo
- **TypeORM** 0.3.x - ORM para TypeScript
- **PostgreSQL** - Base de datos relacional
- **class-validator** - Validación de datos
- **class-transformer** - Transformación de DTOs

### Frontend
- **Astro** 4.0.0 - Framework web ultrarrápido
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** 4.0.0 - Framework CSS utilidad
- **HTML5** - Marcado semántico

### DevOps
- **npm** - Gestor de paquetes

---

## Deployment a Producción

### Deploy Backend a Vercel
El backend NestJS puede deployarse a Vercel, AWS, Heroku, etc.

### Deploy Frontend a Vercel
El frontend Astro puede deployarse a Vercel, Netlify, etc.

Consulta [/backend/README.md](/backend/README.md) y [/frontend/README.md](/frontend/README.md) para instrucciones específicas de deployment.

---

## Características del Sistema

### Servicios
- ✅ CRUD completo
- ✅ Cambio de precio (aplica próximo mes)
- ✅ Activar/desactivar servicios
- ✅ Historial de precios

### Clientes
- ✅ CRUD completo
- ✅ Múltiples suscripciones por cliente
- ✅ Historial de pagos
- ✅ Estados de suscripción (activa, pausada, cancelada)

### Billing
- ✅ Cálculo automático de cobros mensuales
- ✅ Desglose por servicio y cliente
- ✅ Registro de pagos
- ✅ Seguimiento de pagos pendientes/pagados
- ✅ Reportes mensuales

---

## Soporte

Si encuentras problemas:
1. Revisa la sección "Problemas Comunes"
2. Consulta la documentación en los archivos README
3. Revisa los logs en la consola (tanto del backend como del frontend)

---

**Versión**: 1.0.0  
**Última actualización**: 2024  
**Stack**: NestJS + Astro + PostgreSQL

¡Disfruta construyendo con StreamSub!
