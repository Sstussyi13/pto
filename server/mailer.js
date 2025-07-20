import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function escapeHtml(text = '') {
  return (text || '').replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[match]));
}
function encodeFilename(filename) {
  return `=?UTF-8?B?${Buffer.from(filename).toString('base64')}?=`;
}
function formatDateToDDMMYYYY(date) {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
function getVacancyMailHTML({ full_name, birthDate, phone, email, about, resume }) {
  return `
  <div style="background:#f3f4f6;padding:0;margin:0;min-height:100vh;font-family:'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(44,62,80,0.08);overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#212d3b;color:#fff;padding:28px 36px 16px 36px;border-bottom:2px solid #e5e7eb;">
        <h2 style="margin:0;font-size:22px;font-weight:700;">Отклик на вакансию</h2>
        <div style="margin-top:5px;font-size:13px;opacity:0.9;font-weight:400;">Получена новая заявка с сайта</div>
      </div>
      <div style="padding:32px 36px 10px 36px;">
        <table style="width:100%;font-size:15px;border-collapse:collapse;">
          <tr><td style="color:#555;font-weight:600;padding:6px 0;width:155px;">ФИО</td><td>${escapeHtml(full_name)}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Дата рождения</td><td>${escapeHtml(formatDateToDDMMYYYY(birthDate))}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Телефон</td><td>${escapeHtml(phone)}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Email</td><td>${escapeHtml(email)}</td></tr>
        </table>
        <div style="margin:24px 0 0 0;border-top:1px solid #e5e7eb;padding-top:20px;">
          <div style="font-size:14px;font-weight:600;color:#212d3b;margin-bottom:7px;">О себе</div>
          <div style="background:#f7f7fa;border-radius:7px;padding:16px 14px;color:#333;line-height:1.7;font-size:15px;white-space:pre-line;">
            ${escapeHtml(about)}
          </div>
        </div>
        ${resume
          ? `<div style="margin:20px 0 10px 0;font-size:13px;color:#767676;">Резюме прикреплено файлом во вложении</div>`
          : ''}
      </div>
      <div style="background:#f3f4f6;padding:14px 36px 11px 36px;text-align:center;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
        Это письмо создано автоматически. Не отвечайте на него.
      </div>
    </div>
  </div>
  `;
}
function getCalculatorMailHTML({ full_name, phone, email, objectType, objectArea, estimateValue, sectionsText, formattedPrice, message }) {
  return `
  <div style="background:#f3f4f6;padding:0;margin:0;min-height:100vh;font-family:'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(44,62,80,0.08);overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#364152;color:#fff;padding:28px 36px 16px 36px;border-bottom:2px solid #e5e7eb;">
        <h2 style="margin:0;font-size:22px;font-weight:700;">Заявка с калькулятора</h2>
        <div style="margin-top:5px;font-size:13px;opacity:0.9;font-weight:400;">Расчет стоимости проектирования</div>
      </div>
      <div style="padding:32px 36px 10px 36px;">
        <table style="width:100%;font-size:15px;border-collapse:collapse;">
          <tr><td style="color:#555;font-weight:600;padding:6px 0;width:155px;">Имя</td><td>${escapeHtml(full_name)}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Телефон</td><td>${escapeHtml(phone)}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Тип объекта</td><td>${escapeHtml(objectType || '—')}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Площадь</td><td>${escapeHtml(objectArea || '—')} м²</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Сметная стоимость</td><td>${escapeHtml(estimateValue || '—')} ₽</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Разделы проектирования</td><td>${sectionsText}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Итоговая стоимость</td><td>${formattedPrice}</td></tr>
        </table>
        <div style="margin:24px 0 0 0;border-top:1px solid #e5e7eb;padding-top:20px;">
          <div style="font-size:14px;font-weight:600;color:#212d3b;margin-bottom:7px;">Комментарий пользователя</div>
          <div style="background:#f7f7fa;border-radius:7px;padding:14px 12px;color:#333;line-height:1.6;font-size:15px;white-space:pre-line;">
            ${escapeHtml(message || "—")}
          </div>
        </div>
      </div>
      <div style="background:#f3f4f6;padding:14px 36px 11px 36px;text-align:center;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
        Это письмо создано автоматически. Не отвечайте на него.
      </div>
    </div>
  </div>
  `;
}
function getFeedbackMailHTML({ full_name, phone, email, message }) {
  return `
  <div style="background:#f3f4f6;padding:0;margin:0;min-height:100vh;font-family:'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:500px;margin:32px auto;background:#fff;border-radius:10px;box-shadow:0 2px 10px rgba(44,62,80,0.08);overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#374151;color:#fff;padding:20px 30px 12px 30px;border-bottom:2px solid #e5e7eb;">
        <h2 style="margin:0;font-size:20px;font-weight:700;">Заявка с формы обратной связи</h2>
      </div>
      <div style="padding:22px 30px 7px 30px;">
        <table style="width:100%;font-size:15px;border-collapse:collapse;">
          <tr><td style="color:#555;font-weight:600;padding:6px 0;width:120px;">Имя</td><td>${escapeHtml(full_name)}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Телефон</td><td>${escapeHtml(phone)}</td></tr>
          <tr><td style="color:#555;font-weight:600;padding:6px 0;">Email</td><td>${escapeHtml(email)}</td></tr>
        </table>
        <div style="margin:18px 0 0 0;border-top:1px solid #e5e7eb;padding-top:15px;">
          <div style="font-size:14px;font-weight:600;color:#212d3b;margin-bottom:7px;">Сообщение</div>
          <div style="background:#f7f7fa;border-radius:7px;padding:13px 10px;color:#333;line-height:1.6;font-size:15px;white-space:pre-line;">
            ${escapeHtml(message || "—")}
          </div>
        </div>
      </div>
      <div style="background:#f3f4f6;padding:12px 30px 9px 30px;text-align:center;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
        Это письмо создано автоматически. Не отвечайте на него.
      </div>
    </div>
  </div>
  `;
}

export async function sendEmail(data) {
  const firstName = data.firstName || '';
  const lastName = data.lastName || '';
  const middleName = data.middleName || '';
  const full_name =
    data.full_name ||
    [lastName, firstName, middleName].filter(Boolean).join(' ').trim();
  const birthDate = data.birthDate || '';
  const phone = data.phone || '';
  const email = data.email || '';
  const about = typeof data.about === 'string' && data.about.trim()
    ? data.about.trim()
    : (typeof data.message === 'string' ? data.message.trim() : '');
  const resume = data.resume || null;

  const objectType = data.object_type || data.objectType || '';
  const objectArea = data.object_area || data.objectArea || '';
  const estimateValue = data.estimate_value || data.estimateValue || '';
  const estimatedPrice = data.estimated_price || data.estimatedPrice || '';
  const sections = data.sections || [];
  const sectionsText = Array.isArray(sections) && sections.length
    ? sections.map(escapeHtml).join(', ')
    : "—";
  const formattedPrice = estimatedPrice
    ? Number(estimatedPrice).toLocaleString('ru-RU') + ' ₽'
    : '—';
  if (full_name && (about || resume) && birthDate && phone && email) {
    const mailOptions = {
      from: `"PTO Site" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_RECEIVER,
      subject: "Отклик на вакансию",
      replyTo: email,
      html: getVacancyMailHTML({ full_name, birthDate, phone, email, about, resume }),
      attachments: [],
    };

    if (resume) {
      mailOptions.attachments.push({
        filename: encodeFilename(resume.originalname),
        content: resume.buffer,
        contentType: resume.mimetype,
        contentDisposition: 'attachment',
      });
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(' Письмо отправлено (отклик):', info.response);
    return info;
  }
  if (
    objectType && objectArea && estimateValue && Array.isArray(sections) && sections.length &&
    (full_name || phone || email)
  ) {
    const mailOptions = {
      from: `"PTO Site" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_RECEIVER,
      subject: "Заявка с калькулятора стоимости",
      replyTo: email,
      html: getCalculatorMailHTML({
        full_name,
        phone,
        email,
        objectType,
        objectArea,
        estimateValue,
        sectionsText,
        formattedPrice,
        message: data.message || ''
      }),
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено (калькулятор):', info.response);
    return info;
  }
  if (full_name && (data.message || about)) {
    const mailOptions = {
      from: `"PTO Site" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_RECEIVER,
      subject: "Заявка с формы обратной связи",
      replyTo: email,
      html: getFeedbackMailHTML({
        full_name,
        phone,
        email,
        message: data.message || about,
      }),
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(' Письмо отправлено (форма):', info.response);
    return info;
  }

  console.log(' Неизвестный тип заявки или не хватает данных!');
  return null;
}
