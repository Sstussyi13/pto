import express from 'express';
import db from '../config/db.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js'; // ✅ корректные экспорты

const router = express.Router();

// Защищённый маршрут для получения заявок (только для админа)
router.get('/requests', protect, adminOnly, (req, res) => {
  db.all('SELECT * FROM applications', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при получении заявок' });
    }
    res.json(rows);
  });
});

// Защищённый маршрут для загрузки контента
router.get('/content', protect, adminOnly, (req, res) => {
  db.all('SELECT * FROM content', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при получении контента' });
    }
    res.json(rows);
  });
});

export default router;
