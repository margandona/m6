# NeekWorld Backend

## Descripción

Este proyecto es el backend de NeekWorld, una aplicación de chat en tiempo real.

## Requisitos

- Node.js
- npm
- MongoDB

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd NeekWorld/backend/clases/m6
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/neekworld
   ```
4. Inicia el servidor:

   ```bash
   npm start
   ```

## Uso

1. Abre tu navegador y navega a `http://localhost:3000` para acceder a la interfaz de chat en tiempo real.
2. Usa el endpoint `/login` para autenticación básica:

   ```bash
   POST /login
   {
     "username": "admin",
     "password": "password"
   }
   ```
3. Usa el endpoint `/api/messages` para manejar mensajes:

   - Obtener todos los mensajes:
     ```bash
     GET /api/messages
     ```
   - Crear un nuevo mensaje:
     ```bash
     POST /api/messages
     {
       "user": "nombre_usuario",
       "content": "contenido_del_mensaje"
     }
     ```

## Estructura del Proyecto

- `index.js`: Archivo principal del servidor.
- `models/Message.js`: Modelo de datos para los mensajes.
- `routes/messages.js`: Rutas para manejar los mensajes.
- `public/index.html`: Interfaz de usuario para el chat.
- `.gitignore`: Archivos y carpetas ignorados por git.
