import express from 'express';
import { login, logout, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/login', login);
router.get('/check', protect, getProfile);
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  return res.json({ message: 'Вы вышли из системы' });
});

export default router;
