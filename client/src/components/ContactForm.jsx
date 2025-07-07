import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formOptions, setFormOptions] = useState({
    object_types: [],
    id_sections: [],
    control_periods: [],
    service_types: [],
  });

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    service_type: "",
    object_type: "",
    id_section: "",
    control_period: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("/api/content/all").then((res) => {
      const parsed = {};
      res.data.forEach((item) => {
        if (
          ["object_types", "id_sections", "control_periods", "service_types"].includes(item.key)
        ) {
          try {
            parsed[item.key] = JSON.parse(item.value);
          } catch {
            parsed[item.key] = [];
          }
        }
      });
      setFormOptions(parsed);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const cleaned = form.phone.replace(/\D/g, "");
    let isValid = true;

    if (
      !form.full_name.trim() ||
      /[0-9<>;'"`\\\-]/.test(form.full_name) ||
      !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(form.full_name)
    ) {
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

    ["service_type", "object_type", "id_section", "control_period"].forEach((key) => {
      if (!form[key]) {
        newErrors[key] = "Обязательное поле";
        isValid = false;
      }
    });

    if (!form.message.trim()) {
      newErrors.message = "Введите сообщение";
      isValid = false;
    } else if (form.message.length > 1000) {
      newErrors.message = "Сообщение слишком длинное";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      await axios.post("/api/requests", form);
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
        <p className="text-gray-600 mt-2 text-sm">
          Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-8 rounded-xl shadow-xl border border-gray-200"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-gray-900">Оставьте заявку</h2>
        <p className="text-sm text-gray-500 mt-1">
          Мы свяжемся с вами для уточнения деталей. Консультация бесплатна.
        </p>
      </div>

      <div>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="ФИО"
          autoComplete="name"
          className={`w-full border p-3 rounded-md text-sm ${
            errors.full_name ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
        )}
      </div>

      <div>
        <InputMask
          mask="+7 (999) 999-99-99"
          value={form.phone}
          onChange={handleChange}
          maskChar={null}
          name="phone"
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="tel"
              placeholder="Телефон"
              autoComplete="tel"
              className={`w-full border p-3 rounded-md text-sm ${
                errors.phone ? "border-red-400" : "border-gray-300"
              }`}
            />
          )}
        </InputMask>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
          className={`w-full border p-3 rounded-md text-sm ${
            errors.email ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <select
          name="service_type"
          value={form.service_type}
          onChange={handleChange}
          className={`w-full border p-3 rounded-md text-sm ${
            errors.service_type ? "border-red-400" : "border-gray-300"
          }`}
        >
          <option value="">Выберите услугу</option>
          {formOptions.service_types.map((s, idx) => (
            <option key={idx} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service_type && (
          <p className="text-red-500 text-sm mt-1">{errors.service_type}</p>
        )}
      </div>

      <div>
        <select
          name="object_type"
          value={form.object_type}
          onChange={handleChange}
          className={`w-full border p-3 rounded-md text-sm ${
            errors.object_type ? "border-red-400" : "border-gray-300"
          }`}
        >
          <option value="">Тип объекта</option>
          {formOptions.object_types.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.object_type && (
          <p className="text-red-500 text-sm mt-1">{errors.object_type}</p>
        )}
      </div>

      <div>
        <select
          name="id_section"
          value={form.id_section}
          onChange={handleChange}
          className={`w-full border p-3 rounded-md text-sm ${
            errors.id_section ? "border-red-400" : "border-gray-300"
          }`}
        >
          <option value="">Раздел ИД</option>
          {formOptions.id_sections.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.id_section && (
          <p className="text-red-500 text-sm mt-1">{errors.id_section}</p>
        )}
      </div>

      <div>
        <select
          name="control_period"
          value={form.control_period}
          onChange={handleChange}
          className={`w-full border p-3 rounded-md text-sm ${
            errors.control_period ? "border-red-400" : "border-gray-300"
          }`}
        >
          <option value="">Период контрольных срезов</option>
          {formOptions.control_periods.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.control_period && (
          <p className="text-red-500 text-sm mt-1">{errors.control_period}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Сообщение"
          rows={5}
          className={`w-full border p-3 rounded-md text-sm resize-none ${
            errors.message ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

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
