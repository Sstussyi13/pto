// routes/contentRoutes.js
import express from 'express';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Получить весь контент
router.get('/all', (req, res) => {
  db.all(`SELECT key, value FROM editable_content`, (err, rows) => {
    if (err) {
      console.error('Ошибка при получении контента:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    const result = rows.map(row => {
      try {
        return { key: row.key, value: JSON.parse(row.value) };
      } catch (e) {
        console.warn(`⚠️ Невалидный JSON в ключе '${row.key}': ${e.message}`);
        return { key: row.key, value: row.value }; // Вернём как строку
      }
    });

    res.json(result);
  });
});

// Получить конкретный блок
router.get('/:key', (req, res) => {
  const { key } = req.params;

  if (!/^[a-z0-9_-]+$/i.test(key)) {
    return res.status(400).json({ error: 'Некорректный ключ' });
  }

  db.get(`SELECT value FROM editable_content WHERE key = ?`, [key], (err, row) => {
    if (err) {
      console.error('Ошибка при получении контента:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    if (!row) return res.status(404).json({ error: 'Контент не найден' });

    try {
      res.json({ key, value: JSON.parse(row.value) });
    } catch (e) {
      console.error(`Ошибка парсинга JSON для ключа ${key}:`, e.message);
      return res.status(500).json({ error: 'Ошибка чтения контента' });
    }
  });
});

// Обновить контент (только авторизованным)
router.put('/:key', protect, express.json(), (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  if (!/^[a-z0-9_-]+$/i.test(key)) {
    return res.status(400).json({ error: 'Некорректный ключ' });
  }

  if (typeof value === 'undefined') {
    return res.status(400).json({ error: 'Поле value обязательно' });
  }

  try {
    const stringified = JSON.stringify(value);

    db.run(
      `INSERT INTO editable_content (key, value)
       VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      [key, stringified],
      (err) => {
        if (err) {
          console.error('Ошибка сохранения контента:', err.message);
          return res.status(500).json({ error: 'Ошибка сервера' });
        }
        res.json({ message: 'Контент сохранён' });
      }
    );
  } catch (e) {
    console.error('Ошибка при сериализации JSON:', e.message);
    res.status(500).json({ error: 'Ошибка обработки данных' });
  }
});

export default router;
