# Guía de Inicio Rápido

## Pasos para levantar el proyecto localmente en 5 minutos

### 1. Asegurar que PostgreSQL está funcionando

En macOS:
```bash
brew services start postgresql
```

En Windows (si usas installer):
```
El servicio debería estar ejecutándose automáticamente
```

En Linux:
```bash
sudo service postgresql start
```

Crear la base de datos:
```bash
psql -U postgres
CREATE DATABASE streaming_subscriptions;
\q
```

### 2. Clonar/descargar el proyecto

```bash
cd backend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar .env

```bash
cp .env.example .env
```

Edita `.env` y asegúrate de que está así (valores por defecto):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=streaming_subscriptions
API_PORT=3001
NODE_ENV=development
```

Si tu contraseña de PostgreSQL es diferente, cámbiala.

### 5. Iniciar el servidor

```bash
npm run start:dev
```

Deberías ver:
```
[Nest] 12345  - 01/27/2026, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/27/2026, 10:30:00 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
API escuchando en puerto 3001
```

### 6. Verificar que funciona

Abre en el navegador:
- http://localhost:3001
- http://localhost:3001/health

O usa curl:
```bash
curl http://localhost:3001
curl http://localhost:3001/health
```

---

## Ejemplo: Crear tu primer servicio

```bash
curl -X POST http://localhost:3001/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Netflix",
    "description": "Películas y series",
    "currentPrice": 99.99,
    "billingCycle": "monthly"
  }'
```

---

## Ejemplo: Crear tu primer cliente

```bash
curl -X POST http://localhost:3001/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+34600000000"
  }'
```

---

## Uso desde Astro

En tu proyecto Astro, haz fetch a los endpoints:

```typescript
// src/pages/index.astro

import { useEffect, useState } from 'react';

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div>
      <h1>Servicios</h1>
      {services.map(s => (
        <div key={s.id}>
          <h2>{s.name}</h2>
          <p>${s.currentPrice}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:5432"
- PostgreSQL no está corriendo. Inicia el servicio con `brew services start postgresql`

### Error: "database \"streaming_subscriptions\" does not exist"
- Crea la base de datos: `psql -U postgres -c "CREATE DATABASE streaming_subscriptions;"`

### Puerto 3001 ya está en uso
- Cambia el puerto en `.env`: `API_PORT=3002`

### No puedo instalar dependencias
- Borra `node_modules` y `package-lock.json`, luego `npm install` nuevamente

---

## Próximos pasos

1. Consulta README.md para documentación completa de endpoints
2. Implementa tu frontend en Astro
3. Cuando estés listo para producción, deploya en Vercel

---

Happy coding!
