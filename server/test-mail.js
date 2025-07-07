import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Транспорт
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Проверка SMTP (один раз при загрузке)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP недоступен:", error);
  } else {
    console.log("✅ SMTP готов к отправке писем");
  }
});

// Основная функция
export async function sendEmail({ full_name, phone, service_type = "Не указано", message }) {
  const mailOptions = {
    from: `"Сайт ПТО" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_RECEIVER,
    subject: "🔥 Новая заявка с сайта",
    html: `
      <h2>Новая заявка</h2>
      <p><strong>Имя:</strong> ${full_name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Тип услуги:</strong> ${service_type}</p>
      <p><strong>Сообщение:</strong><br>${message}</p>
    `,
  };

  console.log("📨 Пытаемся отправить письмо...");
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Письмо ушло:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Ошибка при отправке письма:", error);
    throw error;
  }
  
} 
// node mailer.js — протестировать вручную
if (process.argv[1] === new URL(import.meta.url).pathname) {
  sendEmail({
    full_name: "Имя Тестера",
    phone: "+7 900 000 00 00",
    message: "Это тестовая заявка с ручным запуском",
  });
}

