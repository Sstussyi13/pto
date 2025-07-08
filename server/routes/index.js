// routes/index.js
import express from 'express';
import contentRoutes from './contentRoutes.js';
import requestRoutes from './requestRoutes.js';
import authRoutes from './authRoutes.js'; // 🔐 новый импорт

const router = express.Router();

// ✅ Healthcheck
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// ✅ Auth маршруты
router.use('/auth', authRoutes);

// ✅ Основные роуты
router.use('/content', contentRoutes);
router.use('/requests', requestRoutes);

export default router;
