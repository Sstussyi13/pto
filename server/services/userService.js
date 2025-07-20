import db from '../config/db.js';
import bcrypt from 'bcrypt';
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};
export const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id, email, name, role FROM users WHERE id = ?`, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

export const verifyPassword = (inputPassword, hashedPassword) => {
  return bcrypt.compare(inputPassword, hashedPassword);
};
