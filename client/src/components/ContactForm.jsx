import { useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import clsx from "clsx";
import axios from "axios";

export default function ContactForm({ initialData = {}, onSuccess }) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
    objectType: "",
    objectArea: "",
    estimateValue: "",
    sections: [],
    estimatedPrice: 0,
    ...initialData,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setForm(prev => ({
        ...prev,
        ...initialData,
      }));
      isFirstRender.current = false;
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "full_name") {
      const filtered = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "");
      setForm(prev => ({ ...prev, [name]: filtered }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleKeyDown = (e) => {
    if (
      e.target.name === "full_name" &&
      /[\d!@#$%^&*()_+={}\[\]:;"'<>,.?\\/|~`]/.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.full_name.trim()) {
      newErrors.full_name = "Введите ФИО";
      isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(form.full_name)) {
      newErrors.full_name = "ФИО должно содержать только буквы, пробелы или дефис";
      isValid = false;
    }

    if (!form.phone.replace(/\D/g, "").match(/^7\d{10}$/)) {
      newErrors.phone = "Введите корректный номер";
      isValid = false;
    }

    if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Введите корректный email";
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
      await axios.post("/api/requests", {
        ...form,
        source: "calculator_form",
      });
      setSubmitted(true);
      onSuccess?.();
    } catch {
      alert("Ошибка отправки. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-green-100">
        <h3 className="text-lg font-semibold text-green-600">Заявка отправлена</h3>
        <p className="text-gray-600 mt-2 text-sm">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-lg mx-auto"
      autoComplete="off"
    >
      <h2 className="text-2xl font-bold mb-4 text-[#193a6a] text-center">
        Оставить заявку
      </h2>

      {/* ФИО */}
      <input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="ФИО"
        className={clsx(
          "w-full border p-3 rounded-lg text-sm bg-gray-50 transition focus:border-[#193a6a] focus:ring-1 focus:ring-[#193a6a]",
          errors.full_name ? "border-red-400" : "border-gray-300"
        )}
      />
      {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}

      {/* Телефон */}
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
            className={clsx(
              "w-full border p-3 rounded-lg text-sm bg-gray-50 transition focus:border-[#193a6a] focus:ring-1 focus:ring-[#193a6a]",
              errors.phone ? "border-red-400" : "border-gray-300"
            )}
          />
        )}
      </InputMask>
      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}

      {/* Email */}
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className={clsx(
          "w-full border p-3 rounded-lg text-sm bg-gray-50 transition focus:border-[#193a6a] focus:ring-1 focus:ring-[#193a6a]",
          errors.email ? "border-red-400" : "border-gray-300"
        )}
      />
      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

      {/* Сообщение */}
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Ваш вопрос или комментарий (необязательно)"
        rows={4}
        className="w-full border p-3 rounded-lg text-sm resize-none border-gray-300 bg-gray-50 transition focus:border-[#193a6a] focus:ring-1 focus:ring-[#193a6a]"
      />

      {/* Скрытые поля */}
      <input type="hidden" name="objectType" value={form.objectType} />
      <input type="hidden" name="objectArea" value={form.objectArea} />
      <input type="hidden" name="estimateValue" value={form.estimateValue} />
      <input type="hidden" name="sections" value={JSON.stringify(form.sections)} />
      <input type="hidden" name="estimatedPrice" value={form.estimatedPrice} />

      {/* Кнопка */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-full bg-[#193a6a] text-white font-semibold border border-[#193a6a]
          transition hover:bg-[#10244a] hover:scale-105 active:scale-98 shadow-lg text-base focus:outline-none"
      >
        {isLoading ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}
