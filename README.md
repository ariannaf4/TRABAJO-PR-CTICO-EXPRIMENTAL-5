# Sistema CRUD con MongoDB

Sistema completo con API REST en Express.js y frontend en React para gestionar usuarios. Incluye autenticación JWT y OAuth con Google.

## 🚀 Características

- ✅ API REST completa con Express.js
- ✅ Autenticación JWT
- ✅ OAuth con Google
- ✅ CRUD de usuarios
- ✅ Frontend React simplificado
- ✅ MongoDB como base de datos
- ✅ Docker Compose para desarrollo
- ✅ Middleware de autenticación
- ✅ Validaciones de entrada

## 📋 Requisitos

- Node.js (v16 o superior)
- Docker y Docker Compose
- MongoDB (incluido en Docker Compose)

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd S14-TRABAJO\ PRÁCTICO\ EXPERIMENTAL_5
```

### 2. Configurar variables de entorno
Copia el archivo de ejemplo y configura tus credenciales:
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales reales:
```env
# Configuración del Backend
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/crud_db
JWT_SECRET=tu_super_secreto_jwt_cambiame_en_produccion

# Configuración OAuth Google
GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui

# Configuración del Frontend
REACT_APP_API_URL=http://localhost:5000
```

**⚠️ IMPORTANTE**: Nunca subas el archivo `.env` al repositorio. Úsa `.env.example` como plantilla.

### 3. Ejecutar con Docker
```bash
docker-compose up -d
```

Esto iniciará:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- MongoDB: localhost:27017

## 🔧 Configuración

### Variables de entorno (.env)
```env
# Configuración básica
NODE_ENV=development
FRONTEND_PORT=3001

# Base de datos
MONGO_USERNAME=admin
MONGO_PASSWORD=password123
MONGO_DATABASE=cruddb

# JWT
JWT_SECRET=mi_clave_secreta_super_segura_2024
JWT_EXPIRE=7d

# Frontend
REACT_APP_API_URL=http://localhost:3000/api
```

### OAuth con Google (Opcional)
Para habilitar la autenticación con Google:

1. Crear un proyecto en [Google Cloud Console](https://console.cloud.google.com/)
2. Habilitar Google OAuth 2.0
3. Configurar las credenciales en el .env:
```env
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

## 🚦 Uso

### Acceso a la aplicación
1. Ve a http://localhost:3001
2. La aplicación te redirigirá al login
3. Puedes registrarte o iniciar sesión
4. Después del login, accederás a la lista de usuarios

### Funcionalidades disponibles
- **Registro**: Crear nueva cuenta con nombre, email y contraseña
- **Login**: Iniciar sesión con email y contraseña
- **OAuth Google**: Autenticación con cuenta de Google
- **Lista de usuarios**: Ver todos los usuarios registrados

## 📁 Estructura del Proyecto

```
├── backend/                 # API REST
│   ├── config/             
│   │   ├── database.js     # Configuración de MongoDB
│   │   └── passport.js     # Configuración OAuth
│   ├── middleware/         
│   │   └── auth.js         # Middleware de autenticación
│   ├── models/             
│   │   └── User.js         # Modelo de usuario MongoDB
│   ├── routes/             
│   │   ├── auth.js         # Rutas de autenticación
│   │   └── users.js        # Rutas de usuarios
│   ├── server.js           # Servidor principal
│   └── package.json        
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── context/        # Context de autenticación
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── services/       # Servicios de API
│   │   └── App.js          # Componente principal
│   └── package.json
├── docker-compose.yml      # Configuración Docker
├── .env                    # Variables de entorno
└── README.md
```

## 🔗 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener perfil del usuario
- `GET /api/auth/google` - Iniciar OAuth con Google
- `GET /api/auth/logout` - Cerrar sesión

### Usuarios
- `GET /api/users` - Obtener todos los usuarios (requiere autenticación)
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario (soft delete)

## 🛡️ Seguridad

- Autenticación JWT
- Contraseñas encriptadas con bcrypt
- Middleware de protección de rutas
- Validación de entrada
- CORS configurado
- Variables de entorno para datos sensibles

## 🐛 Desarrollo

### Comandos útiles
```bash
# Reiniciar todos los servicios
docker-compose down && docker-compose up -d --build

# Ver logs
docker-compose logs backend
docker-compose logs frontend

# Acceder al contenedor
docker exec -it node_backend_app sh
```

### Tecnologías utilizadas

#### Backend
- Express.js - Framework web
- MongoDB - Base de datos NoSQL
- Mongoose - ODM para MongoDB
- JWT - Autenticación
- Passport.js - OAuth
- bcryptjs - Encriptación de contraseñas

#### Frontend
- React - Librería de UI
- React Router - Navegación
- Axios - Cliente HTTP
- Context API - Estado global

## 📝 Notas

- La aplicación está optimizada para simplicidad
- Solo maneja usuarios (no tareas)
- Frontend minimalista sin frameworks de UI
- Configuración unificada con un solo archivo .env
- Desarrollo con Docker para consistencia