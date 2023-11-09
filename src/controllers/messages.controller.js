
import { Router } from 'express';
const router = Router();
import {messageService} from '../services/message-service'



// Ruta para listar los mensajes de un usuario
router.get('/messages', (req, res) => {
  // Recupera los mensajes del usuario actual desde el servicio
  const userId = req.user.id; // Suponemos que el usuario está autenticado
  const userMessages = messageService.getUserMessages(userId);

  res.render('messages', { messages: userMessages }); // Renderiza una vista con la lista de mensajes
});

// Ruta para enviar un mensaje a otro usuario
router.post('/messages/send', (req, res) => {
  const { recipientId, text } = req.body;

  // Valida los datos del mensaje (puedes agregar más validaciones)
  if (!recipientId || !text) {
    return res.status(400).json({ error: 'Falta información del mensaje.' });
  }

  // Envía el mensaje utilizando el servicio
  const senderId = req.user.id; // Suponemos que el usuario está autenticado
  const result = messageService.sendMessage(senderId, recipientId, text);

  if (result) {
    return res.status(201).json({ message: 'Mensaje enviado con éxito.' });
  } else {
    return res.status(500).json({ error: 'No se pudo enviar el mensaje.' });
  }
});

// Ruta para ver los detalles de un mensaje específico
router.get('/messages/:id', (req, res) => {
  const messageId = req.params.id;

  // Obtiene los detalles del mensaje por su ID desde el servicio
  const message = messageService.getMessageById(messageId);

  if (message) {
    res.render('message-details', { message }); // Renderiza una vista con los detalles del mensaje
  } else {
    res.status(404).json({ error: 'Mensaje no encontrado' });
  }
});

module.exports = router;
