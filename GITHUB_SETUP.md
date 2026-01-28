# Guía: Subir a GitHub

Sigue estos pasos para crear el repositorio en GitHub y hacer push de tu código.

## Paso 1: Crear el repositorio en GitHub

1. Ve a https://github.com/new
2. Completa los datos:
   - **Repository name**: `streaming-services.app`
   - **Description**: "Sistema de gestión de suscripciones a servicios de streaming"
   - **Visibility**: Public (o Private si lo prefieres)
   - **Initialize with**: NO marques nada (ya tenemos archivos)
3. Click en **Create repository**

## Paso 2: Inicializar Git localmente

En la raíz del proyecto, ejecuta:

```bash
git init
git add .
git commit -m "Initial commit: Backend NestJS + Frontend Astro"
```

## Paso 3: Conectar con GitHub

Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/streaming-services.app.git
git branch -M main
git push -u origin main
```

## Paso 4: Verificar en GitHub

1. Ve a https://github.com/TU_USUARIO/streaming-services.app
2. Deberías ver todos tus archivos y carpetas

---

## Flujo de Trabajo Futuro

### Para hacer cambios locales:

```bash
# Hacer cambios
git add .
git commit -m "Descripción de cambios"
git push
```

### Para clonar el repo más tarde:

```bash
git clone https://github.com/TU_USUARIO/streaming-services.app.git
cd streaming-services.app

# Seguir instrucciones en README.md o SETUP.md
```

### Para crear una rama para features:

```bash
# Crear y cambiar a nueva rama
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "Agregar nueva funcionalidad"

# Push a la rama
git push origin feature/nueva-funcionalidad

# En GitHub, crear Pull Request
```

---

## Estructura que verás en GitHub

```
streaming-services.app/
├── backend/                    # API NestJS
├── frontend/                   # Frontend Astro
├── README.md                   # Documentación principal
├── SETUP.md                    # Guía de instalación
├── PROJECT_STRUCTURE.md        # Estructura del proyecto
├── GITHUB_SETUP.md             # Este archivo
└── .gitignore                  # Archivos ignorados
```

---

## Troubleshooting

### Error: "remote: Repository not found"

Verifica que:
1. El URL es correcto: `https://github.com/TU_USUARIO/streaming-services.app.git`
2. El repositorio existe en GitHub
3. Tienes permisos de acceso

### Error: "fatal: not a git repository"

Asegúrate de estar en la raíz del proyecto cuando ejecutas `git init`

### Error: "Permission denied (publickey)"

Si usas SSH, asegúrate de tener la clave SSH agregada a tu cuenta GitHub:
```bash
ssh-keygen -t ed25519 -C "tu-email@example.com"
# Luego agregar la clave pública a GitHub Settings → SSH Keys
```

---

## ¿Necesitas ayuda?

- [Documentación de GitHub](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub CLI](https://cli.github.com/) - Alternativa a los comandos anteriores
