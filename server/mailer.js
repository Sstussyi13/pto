import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Проверка что переменные из .env подтянулись
console.log("📦 SMTP CONFIG USED:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.MAIL_USER,
});

// Настройка транспорта
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: '9182e5001@smtp-brevo.com', // логин от Brevo
    pass: process.env.MAIL_PASS,
  },
});

// Проверка соединения
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Error:', error);
  } else {
    console.log('✅ SMTP Connection Successful');
  }
});

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

// Основная функция отправки письма
export async function sendEmail({
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
}) {
  console.log('📨 sendEmail вызвана с:', {
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

  const formattedPrice = estimated_price
    ? parseInt(estimated_price).toLocaleString('ru-RU') + ' ₽'
    : '—';

  const mailOptions = {
    from: `"PTO Site" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_RECEIVER,
    subject: 'Новая заявка с сайта — расчёт стоимости и параметры проекта',
    replyTo: email,
    html: `
      <div style="font-family: 'Segoe UI', Roboto, sans-serif; background: #f4f5f7; padding: 32px;">
        <div style="max-width: 700px; margin: auto; background: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
          
          <div style="background: #1f2937; color: #ffffff; padding: 24px 32px; border-bottom: 1px solid #374151;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600;">Заявка с сайта</h2>
            <p style="margin: 6px 0 0; font-size: 13px; color: #d1d5db;">Форма расчёта и обратной связи</p>
          </div>

          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tbody>
                <tr><td style="padding: 10px 0; font-weight: 600; width: 220px;">Имя</td><td>${escapeHtml(full_name)}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Телефон</td><td>${escapeHtml(phone)}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Email</td><td>${escapeHtml(email)}</td></tr>

                <tr><td colspan="2" style="padding-top: 28px; font-weight: bold; font-size: 15px; color: #111827;">Параметры проекта</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Услуга</td><td>${escapeHtml(service_type || '—')}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Тип объекта</td><td>${escapeHtml(object_type || '—')}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Раздел ИД</td><td>${escapeHtml(id_section || '—')}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Период контрольных срезов</td><td>${escapeHtml(control_period || '—')}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Предварительная стоимость</td><td>${formattedPrice}</td></tr>

                <tr><td colspan="2" style="padding-top: 28px; font-weight: bold; font-size: 15px; color: #111827;">Дополнительная информация</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Объект</td><td>${escapeHtml(object || '—')}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Срок выполнения</td><td>${escapeHtml(deadline || '—')}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Срок рассмотрения</td><td>${escapeHtml(review_deadline || '—')}</td></tr>
                <tr><td style="padding: 10px 0; font-weight: 600;">Техническое задание</td><td>${escapeHtml(message || '—')}</td></tr>
              </tbody>
            </table>
          </div>

          <div style="background: #f9fafb; padding: 20px 32px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
            Это автоматическое уведомление. Пожалуйста, не отвечайте на это письмо.
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
