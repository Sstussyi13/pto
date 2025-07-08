// server/scripts/createAdmin.js
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const email = 'admin@site.ru';
const password = '112233';
const name = 'Главный Админ';
const role = 'admin';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;

  db.run(
    `INSERT INTO users (email, password, name, role, created_at)
     VALUES (?, ?, ?, ?, datetime('now'))`,
    [email, hash, name, role],
    (err) => {
      if (err) return console.error('Ошибка создания админа:', err.message);
      console.log('Админ создан');
    }
  );
});
