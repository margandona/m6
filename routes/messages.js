const express = require('express');
const router = express.Router();

let mensajes = []; // Almacenará los mensajes temporalmente en memoria

// Middleware específico para este router
router.use((req, res, next) => {
    console.log('Middleware de mensajes ejecutado');
    next();
});

// Endpoint para enviar un mensaje (POST)
router.post('/messages', (req, res) => {
    const { user, content } = req.body;
    if (!user || !content) {
        return res.status(400).json({ error: 'El usuario y el contenido son requeridos' });
    }
    const message = { user, content, timestamp: new Date() };
    mensajes.push(message);
    res.status(201).json({ message: 'Mensaje creado', data: message });
});

// Endpoint para obtener todos los mensajes (GET)
router.get('/messages', (req, res) => {
    res.status(200).json({ messages: mensajes });
});

module.exports = router;
