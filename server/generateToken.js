import jwt from 'jsonwebtoken';

// Данные пользователя
const user = {
  id: 1,
  name: 'Админ',
  role: 'admin'
};

const JWT_SECRET = 'ultra_secret_sutulaya'; // Секрет из .env
const JWT_EXPIRES_IN = '1d'; // Время жизни токена

// Генерация нового токена
const token = jwt.sign(
  { id: user.id, name: user.name, role: user.role },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRES_IN }
);

console.log('New Token:', token);
