import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Создание транспортера
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // STARTTLS: false, SSL: true
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  connectionTimeout: 30000,
  socketTimeout: 30000,
  tls: {
    rejectUnauthorized: false, // отключи для теста, потом включи в продакшене
  },
  family: 4, // использовать IPv4
});

// Проверка подключения
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Error:', error);
  } else {
    console.log('✅ SMTP Connection Successful');
  }
});

// Ручной тест — можно раскомментировать при необходимости
/*
async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"PTO Сервис" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER,
      subject: 'Тестовое письмо от PTO',
      text: 'Если ты получил это письмо, SMTP работает корректно!',
    });
    console.log('✅ Письмо отправлено:', info.messageId);
  } catch (err) {
    console.error('❌ Ошибка отправки письма:', err);
  }
}
sendTestEmail();
*/

// HTML-экранирование
function escapeHtml(text = '') {
  return text.replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[match]));
}

// Основная функция отправки писем
export async function sendEmail({
  full_name,
  phone,
  email,
  service_type,
  object_type,
  id_section,
  control_period,
  additional_info,
  message,
}) {
  console.log('📨 sendEmail вызвана с:', {
    full_name,
    phone,
    email,
    service_type,
    object_type,
    id_section,
    control_period,
    additional_info,
    message,
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_RECEIVER,
    subject: '📩 Новая заявка с сайта',
    html: `
  <div style="font-family: 'Segoe UI', Roboto, sans-serif; background: #f4f5f7; padding: 32px;">
    <div style="max-width: 640px; margin: auto; background: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
      
      <div style="background: #1f2937; color: #ffffff; padding: 24px 32px; border-bottom: 1px solid #374151;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 600;">Новая заявка с сайта</h2>
        <p style="margin: 6px 0 0; font-size: 14px; color: #d1d5db;">Форма обратной связи — ПТО / ППР</p>
      </div>
      
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr><td style="padding: 10px 0; font-weight: 600; width: 180px;">Имя</td><td>${escapeHtml(full_name)}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: 600;">Телефон</td><td>${escapeHtml(phone)}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: 600;">Email</td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: 600;">Услуга</td><td>${escapeHtml(service_type || "—")}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: 600;">Тип объекта</td><td>${escapeHtml(object_type || "—")}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: 600;">Раздел ИД</td><td>${escapeHtml(id_section || "—")}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: 600;">Период срезов</td><td>${escapeHtml(control_period || "—")}</td></tr>
            ${additional_info ? `<tr><td style="padding: 10px 0; font-weight: 600;">Доп. информация</td><td>${escapeHtml(additional_info)}</td></tr>` : ""}
            <tr><td style="padding: 10px 0; font-weight: 600;">Сообщение</td><td>${escapeHtml(message || "—")}</td></tr>
          </tbody>
        </table>
      </div>
      
      <div style="background: #f9fafb; padding: 20px 32px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        Это автоматическое уведомление. Пожалуйста, не отвечайте на него напрямую.
      </div>
    </div>
  </div>
`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Письмо отправлено:', info.response);
    return info;
  } catch (err) {
    console.error('❌ Ошибка при отправке письма:', err.message);
    throw err;
  }
}
