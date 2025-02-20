const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares principales
app.use(express.json()); 
app.use(cookieParser());
app.use(morgan('dev'));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Implementar autenticación básica para usuarios
const users = [{ username: 'admin', password: 'password' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.status(200).json({ message: 'Login exitoso' });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Importar rutas
const mensajesRouter = require('./routes/messages');
app.use('/api', mensajesRouter);

// Middleware global (se ejecuta en cada solicitud)
app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '¡Algo salió mal!' });
});

// Configurar el servidor con Socket.io y WebSocket
const server = http.createServer(app);
const io = socketIo(server);

// Manejar eventos de conexión y mensajes con Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('sendMessage', (message) => {
    message.timestamp = new Date();
    console.log('Mensaje recibido:', message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Cliente desconectado: ${reason}`);
  });

  socket.on('error', (error) => {
    console.error(`Error en el socket: ${error}`);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
