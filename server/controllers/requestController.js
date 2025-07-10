import db from '../config/db.js';
import { sendEmail } from '../mailer.js';

export const submitRequest = async (req, res, next) => {
  try {
    const {
      full_name,
      phone,
      email = '',
      service_type = '',
      object_type = '',
      id_section = '',
      control_period = '',
      object = '',
      deadline = '',
      review_deadline = '',
      estimated_price = '',
      message = '',
    } = req.body;

    // --- Валидация ---
    if (!full_name?.trim() || !phone?.trim()) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    if (!/^7\d{10}$/.test(cleanedPhone)) {
      return res.status(400).json({ error: 'Введите корректный номер телефона (начиная с 7)' });
    }

    // --- Лог заявки ---
    console.log('📩 Новая заявка:', {
      full_name,
      phone,
      email,
      service_type,
      object_type,
      id_section,
      control_period,
      object,
      deadline,
      review_deadline,
      estimated_price,
      message,
    });

    // --- Сохранение в SQLite ---
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO applications (full_name, phone, service_type, message)
         VALUES (?, ?, ?, ?)`,
        [
          full_name.trim(),
          phone.trim(),
          service_type.trim(),
          message.trim(),
        ],
        (err) => {
          if (err) {
            console.error('❌ SQLite ошибка:', err.message);
            return reject(err);
          }
          resolve();
        }
      );
    });

    // --- Отправка письма ---
    try {
      console.log('📬 Отправляем письмо...');
      await sendEmail({
        full_name,
        phone,
        email,
        service_type,
        object_type,
        id_section,
        control_period,
        object,
        deadline,
        review_deadline,
        estimated_price,
        message,
      });
      console.log('✅ Письмо отправлено');
    } catch (emailErr) {
      console.error('❌ Ошибка отправки письма:', emailErr.message);
      // письмо не критично — не прерываем отправку заявки
    }

    return res.status(201).json({ message: 'Заявка успешно отправлена и сохранена' });
  } catch (err) {
    console.error('💥 Ошибка в submitRequest:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};
