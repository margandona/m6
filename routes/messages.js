const express = require('express');
const router = express.Router();

let mensajes = []; // Almacenará los mensajes temporalmente en memoria

// Middleware específico para este router
router.use((req, res, next) => {
    console.log('Middleware de mensajes ejecutado');
    next();
});

// Endpoint para enviar un mensaje (POST)
router.post('/enviar', (req, res) => {
    const { mensaje } = req.body;
    if (!mensaje) {
        return res.status(400).json({ error: 'El mensaje es requerido' });
    }
    mensajes.push(mensaje);
    res.json({ mensaje: 'Mensaje recibido', contenido: mensaje });
});

// Endpoint para obtener todos los mensajes (GET)
router.get('/mensajes', (req, res) => {
    res.json({ mensajes });
});

module.exports = router;
