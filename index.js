const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares principales
app.use(express.json()); 
app.use(cookieParser());
app.use(morgan('dev'));

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

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
