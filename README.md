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

## 🚀 Deployment Gratuito

### Railway (Recomendado)

1. Ve a https://railway.app y conecta tu cuenta GitHub
2. Click en **"New Project"** → **"Deploy from GitHub repo"**
3. Selecciona este repositorio
4. Railway detectará automáticamente Node.js
5. Agrega las variables de entorno en Railway:
   - `MONGODB_URI`: Tu URI de MongoDB
   - `DB_NAME`: Nombre de tu base de datos
   - `JWT_SECRET`: Tu secret JWT
   - `JWT_ALGORITHM`: HS256
   - `JWT_EXP_MINUTES`: 60
   - `FRONTEND_URL`: URL de tu frontend desplegado
   - `NODE_ENV`: production
6. Railway te dará una URL pública automáticamente

### Render

1. Ve a https://render.com y conecta GitHub
2. Click en **"New +"** → **"Web Service"**
3. Conecta este repositorio
4. Configuración:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Agrega las mismas variables de entorno
6. Render te dará una URL como: `https://tu-app.onrender.com`

### Vercel (Serverless)

1. Ve a https://vercel.com y conecta GitHub
2. Importa este repositorio
3. Vercel detectará la configuración en `vercel.json`
4. Agrega las variables de entorno
5. Deploy automático

**Nota**: Vercel puede tener cold starts. Railway/Render son mejores para backends Express.

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
├── vercel.json                # Configuración Vercel
├── railway.json               # Configuración Railway
└── .env
```
