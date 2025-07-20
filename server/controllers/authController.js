import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const TOKEN_EXPIRES_IN = '7d';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

  try {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
      if (err) {
        console.error('Ошибка при поиске пользователя:', err.message);
        return res.status(500).json({ message: 'Ошибка сервера' });
      }

      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Нет доступа' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: TOKEN_EXPIRES_IN }
      );

      res
        .cookie('token', token, COOKIE_OPTIONS)
        .json({ message: 'Вход выполнен', email: user.email, name: user.name });
    });
  } catch (err) {
    console.error('Ошибка входа:', err.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
export const getProfile = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
  });
};
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.json({ message: 'Вы вышли' });
};
