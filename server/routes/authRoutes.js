import express from 'express';
import { login, logout, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Вход по логину/паролю
router.post('/login', login);

// Проверка авторизации
router.get('/check', protect, getProfile);

// Выход — очищаем cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  return res.json({ message: 'Вы вышли из системы' });
});

export default router;
