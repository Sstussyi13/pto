import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";

export default function ContactForm() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
    object: "",
    object_type: "",
    id_section: "",
    service_type: "",
    control_period: "",
    deadline: null,
    review_deadline: null,
  });

  const [dropdowns, setDropdowns] = useState({
    service_types: [],
    object_types: [],
    id_sections: [],
    control_periods: [],
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [targetPrice, setTargetPrice] = useState(null);

  useEffect(() => {
    axios.get("/api/content/all").then((res) => {
      const loaded = {};
      res.data.forEach((item) => {
        try {
          loaded[item.key] = JSON.parse(item.value);
        } catch {
          loaded[item.key] = [];
        }
      });

      setDropdowns({
        service_types: loaded.service_types || [],
        object_types: loaded.object_types || [],
        id_sections: loaded.id_sections || [],
        control_periods: loaded.control_periods || [],
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "full_name" && /[^a-zA-Zа-яА-ЯёЁ\s]/.test(value)) return;
    if (name === "phone" && /[^0-9+()\s-]/.test(value)) return;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const cleaned = form.phone.replace(/\D/g, "");
    let isValid = true;

    if (!form.full_name.trim() || !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(form.full_name)) {
      newErrors.full_name = "Имя должно содержать только буквы";
      isValid = false;
    }

    if (!/^7\d{10}$/.test(cleaned)) {
      newErrors.phone = "Введите корректный номер";
      isValid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Введите корректный email";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Введите сообщение";
      isValid = false;
    }

    if (!form.deadline) {
      newErrors.deadline = "Выберите срок выполнения";
      isValid = false;
    }

    if (!form.review_deadline) {
      newErrors.review_deadline = "Выберите срок рассмотрения";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const { service_type, object_type, id_section, control_period } = form;
    if (!(service_type && object_type && id_section && control_period)) return;

    const basePrices = {
      "Проектирование": 10000,
      "Согласование": 15000,
      "Экспертиза": 20000,
      "Авторский надзор": 12000,
      "Рабочая документация": 17000,
    };
    const objectCoeffs = {
      "Жилой дом": 1.0,
      "Промышленный объект": 1.5,
      "Общественное здание": 1.2,
      "Дорога": 1.3,
      "Мост": 1.4,
      "Школа": 1.1,
    };
    const sectionCoeffs = {
      "Раздел А": 1.0,
      "Раздел Б": 1.3,
      "Раздел В": 1.5,
      "Раздел Г": 1.2,
      "Раздел Д": 1.4,
      "Раздел Е": 1.6,
    };
    const periodCoeffs = {
      "Раз в месяц": 1.0,
      "Раз в квартал": 1.2,
      "Раз в год": 1.5,
      "По завершению этапа": 1.3,
    };

    const base = basePrices[service_type] || 0;
    const obj = objectCoeffs[object_type] || 1;
    const sec = sectionCoeffs[id_section] || 1;
    const per = periodCoeffs[control_period] || 1;
    const total = Math.round(base * obj * sec * per);
    setTargetPrice(total);
  }, [form.service_type, form.object_type, form.id_section, form.control_period]);

  useEffect(() => {
    if (targetPrice === null) return;
    let current = animatedPrice;
    const duration = 400;
    const steps = 30;
    const stepTime = duration / steps;
    const difference = targetPrice - current;
    const step = difference / steps;

    const interval = setInterval(() => {
      current += step;
      if ((step > 0 && current >= targetPrice) || (step < 0 && current <= targetPrice)) {
        clearInterval(interval);
        setAnimatedPrice(targetPrice);
      } else {
        setAnimatedPrice(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [targetPrice]);

  const toISO = (date) => date?.toISOString()?.split("T")[0] ?? "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      await axios.post("/api/requests", {
        ...form,
        deadline: toISO(form.deadline),
        review_deadline: toISO(form.review_deadline),
        estimated_price: targetPrice,
        source: "calculator_form",
      });
      setSubmitted(true);
    } catch {
      alert("Ошибка отправки. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-6 text-center shadow border border-green-100">
        <h3 className="text-lg font-semibold text-green-600">Заявка отправлена</h3>
        <p className="text-gray-600 mt-2 text-sm">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Заявка на расчёт</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {["service_type", "object_type", "id_section", "control_period"].map((key, idx) => (
          <select
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              {{
                service_type: "Выберите услугу",
                object_type: "Тип объекта",
                id_section: "Раздел ИД",
                control_period: "Контрольный период",
              }[key]}
            </option>
            {dropdowns[key + "s"]?.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        ))}
      </div>

      {targetPrice && (
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-center">
          <p className="text-sm text-gray-500">Предварительная стоимость:</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {animatedPrice.toLocaleString("ru-RU")} ₽
          </p>
        </div>
      )}

      <input
        name="object"
        value={form.object}
        onChange={handleChange}
        placeholder="Название объекта"
        className="w-full border p-3 rounded-md text-sm border-gray-300"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <div className="grid sm:grid-cols-2 gap-4">
          <DatePicker
            label="Срок выполнения"
            value={form.deadline ? dayjs(form.deadline) : null}
            onChange={(date) => setForm((prev) => ({ ...prev, deadline: date?.toDate() ?? null }))}
            minDate={dayjs("2025-01-01")}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: !!errors.deadline,
                helperText: errors.deadline,
                inputProps: {
                  onFocus: (e) => e.target.click(),
                },
              },
            }}
          />

          <DatePicker
            label="Срок рассмотрения"
            value={form.review_deadline ? dayjs(form.review_deadline) : null}
            onChange={(date) => setForm((prev) => ({ ...prev, review_deadline: date?.toDate() ?? null }))}
            minDate={dayjs("2025-01-01")}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: !!errors.review_deadline,
                helperText: errors.review_deadline,
                inputProps: {
                  onFocus: (e) => e.target.click(),
                },
              },
            }}
          />
        </div>
      </LocalizationProvider>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Техническое задание"
        rows={5}
        maxLength={1000}
        className={`w-full border p-3 rounded-md text-sm resize-none ${
          errors.message ? "border-red-400" : "border-gray-300"
        }`}
      />
      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

      <input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="ФИО"
        className={`w-full border p-3 rounded-md text-sm ${
          errors.full_name ? "border-red-400" : "border-gray-300"
        }`}
      />
      {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}

      <InputMask
        mask="+7 (999) 999-99-99"
        value={form.phone}
        onChange={handleChange}
        name="phone"
        maskChar={null}
      >
        {(inputProps) => (
          <input
            {...inputProps}
            type="tel"
            placeholder="Телефон"
            className={`w-full border p-3 rounded-md text-sm mt-3 ${
              errors.phone ? "border-red-400" : "border-gray-300"
            }`}
          />
        )}
      </InputMask>
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className={`w-full border p-3 rounded-md text-sm mt-3 ${
          errors.email ? "border-red-400" : "border-gray-300"
        }`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-gray-800 text-white w-full py-3 rounded-md hover:bg-gray-700 transition text-sm font-medium"
      >
        {isLoading ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}
