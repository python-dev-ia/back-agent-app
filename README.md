# Back Agent App

Backend API para la aplicación Agent App construido con Express, TypeScript y MongoDB.

## Características

- ✅ API REST con Express
- ✅ Autenticación con JWT
- ✅ Registro de usuarios
- ✅ Login de usuarios
- ✅ Hash de contraseñas con bcrypt
- ✅ CORS configurado
- ✅ TypeScript

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agent-app
JWT_SECRET=your-secret-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

## Ejecutar

### Modo desarrollo (con hot reload)
```bash
npm run dev
```

### Modo producción
```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:5000`

## Endpoints

### Autenticación

#### POST `/api/auth/register`
Registrar un nuevo usuario

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario creado exitosamente",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

#### POST `/api/auth/login`
Iniciar sesión

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Login exitoso",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

## Estructura del proyecto

```
back-agent-app/
├── src/
│   ├── config/
│   │   └── db.ts              # Configuración de MongoDB
│   ├── models/
│   │   └── User.ts            # Modelo de Usuario
│   ├── routes/
│   │   └── auth.ts            # Rutas de autenticación
│   └── index.ts               # Servidor principal
├── tsconfig.json
├── package.json
└── .env
```
