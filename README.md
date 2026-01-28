# Streaming Services App

Sistema profesional de gestión de suscripciones a servicios de streaming.

## 📦 Descripción

Una aplicación full-stack para gestionar:
- **Servicios de streaming** con precios variables
- **Clientes** y sus suscripciones
- **Billing automático** mensual
- **Historial de pagos** y cambios de precios
- **Dashboard** con estadísticas en tiempo real

## 🏗️ Arquitectura

- **Backend**: NestJS + PostgreSQL + TypeORM
- **Frontend**: Astro + TypeScript + Tailwind CSS
- **Deployment**: Vercel (Backend y Frontend)

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js >= 18
- PostgreSQL >= 12
- npm o yarn

### Instalación y Ejecución

**1. Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/streaming-services.app.git
cd streaming-services.app
```

**2. Configurar Base de Datos:**
```bash
psql -U postgres
CREATE DATABASE streaming_subscriptions;
\q
```

**3. Setup del Backend (Terminal 1):**
```bash
cd backend
npm install
cp .env.example .env
# Edita .env si es necesario
npm run start:dev
```
El backend estará disponible en: `http://localhost:3001`

**4. Setup del Frontend (Terminal 2):**
```bash
cd frontend
npm install
cp .env.example .env
# Asegúrate que API_URL=http://localhost:3001
npm run dev
```
La aplicación estará disponible en: `http://localhost:3000`

## 📚 Documentación

- **[SETUP.md](/SETUP.md)** - Guía detallada de instalación y configuración
- **[PROJECT_STRUCTURE.md](/PROJECT_STRUCTURE.md)** - Estructura completa del proyecto
- **[Backend README](/backend/README.md)** - Documentación del backend
- **[Frontend README](/frontend/README.md)** - Documentación del frontend
- **[API Examples](/backend/API_EXAMPLES.md)** - Ejemplos de consumo de API

## 📋 Funcionalidades Principales

### Dashboard
- Estadísticas generales del sistema
- Total de clientes activos
- Ingresos mensuales proyectados
- Gráficos y métricas en tiempo real

### Gestión de Servicios
- CRUD de servicios de streaming
- Cambio de precios (aplica al siguiente mes)
- Historial de cambios de precio
- Activar/desactivar servicios

### Gestión de Clientes
- CRUD de clientes
- Vista detallada por cliente
- Historial de suscripciones
- Historial de pagos

### Suscripciones
- Suscribir clientes a servicios
- Pausar/reanudar suscripciones
- Cancelar suscripciones
- Estado en tiempo real

### Billing y Pagos
- Cálculo automático mensual
- Total a cobrar por cliente
- Registro de pagos
- Reportes mensuales
- Seguimiento de deudas

## 🛠️ Tech Stack

### Backend
```json
{
  "@nestjs/core": "^10.x",
  "@nestjs/common": "^10.x",
  "typeorm": "^0.3.x",
  "pg": "^8.x",
  "class-validator": "^0.14.x",
  "class-transformer": "^0.5.x"
}
```

### Frontend
```json
{
  "astro": "^4.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x"
}
```

## 📁 Estructura de Carpetas

```
streaming-services.app/
├── backend/                          # API NestJS
│   ├── src/
│   │   ├── entities/                # Modelos TypeORM
│   │   ├── services/                # Lógica de negocio
│   │   ├── controllers/             # Endpoints REST
│   │   ├── modules/                 # Módulos NestJS
│   │   ├── dtos/                    # Data Transfer Objects
│   │   └── database/                # Configuración DB
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── README.md
│   ├── QUICKSTART.md
│   └── API_EXAMPLES.md
│
├── frontend/                         # Frontend Astro
│   ├── src/
│   │   ├── pages/                   # Rutas (Astro)
│   │   ├── components/              # Componentes reutilizables
│   │   ├── layouts/                 # Layouts
│   │   ├── types/                   # Tipos TypeScript
│   │   ├── utils/                   # Utilidades
│   │   └── styles/                  # Estilos CSS
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── astro.config.mjs
│   ├── .env.example
│   ├── README.md
│   └── QUICKSTART.md
│
├── SETUP.md                          # Guía de instalación
├── PROJECT_STRUCTURE.md              # Estructura detallada
└── README.md                         # Este archivo
```

## 🌐 Deployment

### En Vercel

**Backend:**
1. Crea un nuevo proyecto en Vercel
2. Selecciona la carpeta `backend`
3. Configura variables de entorno
4. Deploy automático en cada push

**Frontend:**
1. Crea un nuevo proyecto en Vercel
2. Selecciona la carpeta `frontend`
3. Configura `API_URL` apuntando a tu backend
4. Deploy automático en cada push

Ver [SETUP.md](/SETUP.md) para detalles completos.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## 📞 Soporte

Si tienes preguntas o encuentras problemas:
1. Revisa la [documentación](/SETUP.md)
2. Abre un issue en GitHub
3. Contacta al desarrollador

---

**Creado con ❤️ usando NestJS, Astro y PostgreSQL**
