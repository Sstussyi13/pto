import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = path.resolve(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Ошибка подключения к БД:', err.message);
  } else {
    console.log('SQLite подключена по пути:', dbPath);
  }
});
const initDatabase = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL CHECK(length(phone) >= 10),
        service_type TEXT,
        message TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `, (err) => {
      if (err) {
        console.error('Ошибка при создании таблицы applications:', err.message);
      } else {
        console.log('Таблица applications готова');
      }
    });
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT DEFAULT 'Без имени',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `, (err) => {
      if (err) {
        console.error('Ошибка при создании таблицы users:', err.message);
      } else {
        console.log(' Таблица users готова');
      }
    });
  });
};
initDatabase();

export default db;
