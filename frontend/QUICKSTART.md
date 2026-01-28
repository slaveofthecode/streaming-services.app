# Guía Rápida - StreamSub Frontend

¡Levanta tu interfaz en 5 minutos!

## 1. Requisitos Previos

Asegúrate de tener:
- Node.js 18+ instalado
- El backend NestJS corriendo en `http://localhost:3001`
- PostgreSQL conectado y con la base de datos `streaming_subscriptions`

## 2. Instalación

```bash
# Navega a la carpeta del frontend
cd frontend

# Instala las dependencias
npm install

# Copia el archivo de configuración
cp .env.example .env
```

## 3. Verificar Configuración

Abre `.env` y asegúrate de que:

```env
ASTRO_PUBLIC_API_URL=http://localhost:3001/api
```

Si tu backend está en otro puerto, cámbialo aquí.

## 4. Inicia el Servidor de Desarrollo

```bash
npm run dev
```

Verás algo como:

```
> Frontend running at:
> 🚀 Server started in 127ms
> ➜  Local:   http://localhost:3000/
```

## 5. Abre tu Navegador

Ve a: **http://localhost:3000**

¡Listo! Deberías ver el dashboard de StreamSub.

## Primeros Pasos

### 1. Crear un Servicio
1. Haz clic en "Servicios" en la navegación
2. Haz clic en "+ Nuevo Servicio"
3. Completa el formulario (ej: Netflix, $9.99/mes)
4. Guarda

### 2. Crear un Cliente
1. Haz clic en "Clientes"
2. Haz clic en "+ Nuevo Cliente"
3. Completa datos (nombre, email, etc.)
4. Guarda

### 3. Suscribir Cliente a Servicio
1. En "Clientes", haz clic en "Ver" del cliente
2. Haz clic en "+ Nueva Suscripción"
3. Selecciona el servicio
4. Guarda

### 4. Registrar Pago
1. Ve a "Billing"
2. Selecciona el mes (por defecto es el actual)
3. Haz clic en "Registrar Pago" para un cliente
4. Ingresa el monto y confirma

## Estructura de Carpetas

```
frontend/
├── src/pages/         # Las páginas de tu app
├── src/components/    # Componentes reutilizables
├── src/utils/api.ts   # Conexión con la API
├── src/types/         # Tipos TypeScript
└── src/styles/        # Estilos Tailwind
```

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Validar TypeScript
npm run check
```

## Errores Comunes

### "Cannot connect to API"
```bash
# Verifica que el backend está corriendo:
# En otra terminal, ve a /backend y ejecuta:
npm run start:dev
```

### "Port 3000 already in use"
```bash
# Ejecuta en un puerto diferente:
npm run dev -- --port 3001
```

### Cambios no se ven
```bash
# Reinicia el servidor:
# Presiona Ctrl+C y ejecuta npm run dev nuevamente
```

## Próximos Pasos

- Lee el [README.md](./README.md) para documentación completa
- Revisa [API_EXAMPLES.md](../backend/API_EXAMPLES.md) en el backend para más ejemplos
- Customiza los colores en `tailwind.config.js`
- Añade más funcionalidades según necesites

## Estructura de Datos

```
Cliente
  ├── Suscripciones
  │   └── Servicio (con precio actual)
  └── Pagos (historial)

Servicio
  ├── Precio actual
  └── Historial de precios

Billing (por mes)
  └── Por cada cliente
      └── Desglose de servicios
          └── Total a cobrar
```

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Página en blanco | Revisa console (F12) para errores |
| Botones no funcionan | Verifica que la API está accesible |
| Datos no actualizan | Recarga la página (F5) |
| Error CORS | Verifica `ASTRO_PUBLIC_API_URL` en .env |

---

¿Todo funcionando? ¡Felicidades! Tu sistema de gestión de suscripciones está listo.
