// routes/requestRoutes.js
import express from 'express';
import { submitRequest } from '../controllers/requestController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Публичный маршрут для отправки заявок
router.post('/', submitRequest);

// Защищённый маршрут для получения заявок (только для админа)
router.get('/', protect, adminOnly, (req, res) => {
  // Логика для получения заявок (например, запрос к БД)
  res.json({ message: 'Заявки для админа' });
});

export default router;
