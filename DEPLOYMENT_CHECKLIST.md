# Checklist de Deployment

Aquí está el checklist completo antes de hacer deploy a producción.

## Antes de Subir a GitHub

- [ ] Revisar que ambos proyectos funcionan localmente
- [ ] Verificar que los .env.example tienen las variables correctas
- [ ] Asegurar que .gitignore está actualizado
- [ ] Revisar que no hay contraseñas o datos sensibles en el código

## Configuración en GitHub

- [ ] Crear repositorio con nombre "streaming-services.app"
- [ ] Hacer push del código
- [ ] Verificar que aparecen todos los archivos
- [ ] Crear rama `development` para desarrollo
- [ ] Configurar rama `main` como default
- [ ] Agregar descripción y README visible

## Antes de Deployment a Vercel

### Backend Vercel Project

- [ ] Conectar repositorio GitHub
- [ ] Seleccionar carpeta raíz: `backend`
- [ ] Runtime: Node.js
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Variables de entorno:
  - [ ] `DATABASE_HOST` - tu servidor PostgreSQL
  - [ ] `DATABASE_PORT` - 5432
  - [ ] `DATABASE_USER` - usuario PostgreSQL
  - [ ] `DATABASE_PASSWORD` - contraseña
  - [ ] `DATABASE_NAME` - streaming_subscriptions
  - [ ] `NODE_ENV` - production
  - [ ] `API_PORT` - 3001 (opcional)

### Frontend Vercel Project

- [ ] Conectar repositorio GitHub
- [ ] Seleccionar carpeta raíz: `frontend`
- [ ] Framework: Astro
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Variables de entorno:
  - [ ] `VITE_API_URL` - URL del backend en Vercel
  - [ ] `PUBLIC_API_URL` - URL del backend en Vercel

## Testing en Producción

- [ ] Backend responde en URL de Vercel
- [ ] Frontend carga correctamente
- [ ] Frontend puede conectarse al backend
- [ ] Crear un cliente de prueba
- [ ] Crear un servicio de prueba
- [ ] Crear una suscripción de prueba
- [ ] Verificar que el billing calcula correctamente
- [ ] Registrar un pago de prueba

## Monitoreo Post-Deployment

- [ ] Configurar logs en Vercel
- [ ] Revisar errores en backend
- [ ] Revisar errores en frontend
- [ ] Monitorear uso de base de datos
- [ ] Configurar alertas si es necesario

## Seguridad

- [ ] No compartir URLs de variables de entorno
- [ ] Usar HTTPS en todas las conexiones
- [ ] Validar todas las inputs en el backend
- [ ] Implementar rate limiting si es necesario
- [ ] Revisar CORS si tienes múltiples dominios
- [ ] Hacer backup regular de la base de datos

## Documentación

- [ ] README.md está actualizado
- [ ] SETUP.md tiene instrucciones correctas
- [ ] API_EXAMPLES.md está actualizado
- [ ] Documentar cualquier cambio hecho desde v0

## Optimización

- [ ] Backend: revisar queries lentas
- [ ] Frontend: revisar bundle size
- [ ] Base de datos: crear índices en tablas importantes
- [ ] Cache: implementar caché si es necesario

## Próximos Pasos

1. **Configurar CI/CD** - GitHub Actions para tests automáticos
2. **Agregar tests** - Unit tests para servicios críticos
3. **Implementar autenticación** - Proteger endpoints si es necesario
4. **Agregar validaciones** - Email, teléfono, etc.
5. **Mejorar UI/UX** - Animaciones, transiciones
6. **Agregar gráficos** - Dashboard más visual
7. **Implementar notificaciones** - Email sobre pagos pendientes
8. **Agregar reportes** - Exportar datos en CSV/PDF

---

Cuando completes todos estos puntos, tu app estará lista para producción.
