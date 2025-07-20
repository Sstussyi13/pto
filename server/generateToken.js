import jwt from 'jsonwebtoken';
const user = {
  id: 1,
  name: 'Админ',
  role: 'admin'
};

const JWT_SECRET = 'ultra_secret';
const JWT_EXPIRES_IN = '1d';
const token = jwt.sign(
  { id: user.id, name: user.name, role: user.role },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRES_IN }
);

console.log('New Token:', token);
