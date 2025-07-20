import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import TextField from '@mui/material/TextField';

const steps = [
  { label: "Личные данные" },
  { label: "О себе" },
  { label: "Контакты" },
];

const initialData = {
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: null,
  about: "",
  resume: null,
  phone: "",
  email: "",
  agree: false,
};

const NAME_REGEX = /^[А-ЯЁа-яёA-Za-z\-]+$/;
const FORBIDDEN_CHARS_REGEX = /[^А-ЯЁа-яёA-Za-z\-]/g;

function isValidName(str) {
  return NAME_REGEX.test(str.trim());
}
function hasSQLiSymbols(str) {
  return /['"`;%=\\<>\(\)\[\]\{\}|]/.test(str) ||
    /(--|\b(OR|AND|SELECT|INSERT|DELETE|UPDATE|DROP|UNION|WHERE|FROM)\b)/i.test(str);
}

export default function MultiStepVacancyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const vacancy = {
    title: search.get("title"),
    salary: search.get("salary"),
    experience: search.get("experience"),
  };
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInput = useRef();

  function validate(current = data, s = step) {
    let errs = {};
    if (s === 0) {
      if (!current.lastName.trim()) errs.lastName = "Заполните фамилию";
      else if (!isValidName(current.lastName)) errs.lastName = "Только буквы русского/английского алфавита и дефис";
      if (!current.firstName.trim()) errs.firstName = "Заполните имя";
      else if (!isValidName(current.firstName)) errs.firstName = "Только буквы русского/английского алфавита и дефис";
      if (current.middleName && !isValidName(current.middleName)) errs.middleName = "Только буквы русского/английского алфавита и дефис";
      if (hasSQLiSymbols(current.lastName) || hasSQLiSymbols(current.firstName) || (current.middleName && hasSQLiSymbols(current.middleName))) {
        errs.lastName = errs.firstName = errs.middleName = "Недопустимые символы";
      }
      if (!current.birthDate) errs.birthDate = "Выберите дату рождения";
      else if (current.birthDate > eighteenYearsAgo) errs.birthDate = "Возраст должен быть не менее 18 лет";
    }
    if (s === 1) {
      if (!current.about.trim()) errs.about = "Расскажите о себе";
      else if (hasSQLiSymbols(current.about)) errs.about = "Недопустимые символы";
      if (!current.resume) errs.resume = "Прикрепите файл";
      else if (
        current.resume &&
        !["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(current.resume.type)
      ) {
        errs.resume = "Только PDF/DOC/DOCX";
      }
    }
    if (s === 2) {
      if (!/^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(current.phone.trim()))
        errs.phone = "Телефон в формате +7 (999) 123-45-67";
      if (!/^[\w\-.]+@[\w\-.]+\.\w{2,}$/.test(current.email.trim()))
        errs.email = "Некорректный email";
      if (!current.agree) errs.agree = "Необходимо согласие";
    }
    return errs;
  }

  function handleNameInput(e) {
    const { name, value } = e.target;
    const filtered = value.replace(FORBIDDEN_CHARS_REGEX, "");
    setData(prev => ({ ...prev, [name]: filtered }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate({ ...data, [name]: filtered }, step));
  }

  function handleInput(e) {
    const { name, value, type, checked, files } = e.target;
    let newValue =
      type === "checkbox" ? checked :
      type === "file" ? files[0] :
      value;
    setData(prev => ({ ...prev, [name]: newValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate({ ...data, [name]: newValue }, step));
  }

  function handleDate(date) {
    setData(prev => ({ ...prev, birthDate: date }));
    setTouched(prev => ({ ...prev, birthDate: true }));
    setErrors(validate({ ...data, birthDate: date }, step));
  }

  function nextStep() {
    const errs = validate(data, step);
    setTouched({});
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(step + 1);
  }
  function prevStep() {
    setTouched({});
    setErrors({});
    setStep(step - 1);
  }

  async function handleSend(e) {
    e.preventDefault();
    const errs = validate(data, step);
    setErrors(errs);
    setTouched({});
    if (Object.keys(errs).length) return;
    setSending(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) =>
        formData.append(k, v ?? "")
      );
      Object.entries(vacancy).forEach(([k, v]) => {
        if (v) formData.append(`vacancy_${k}`, v);
      });
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });
      if (res.ok) setSuccess(true);
      else setErrors({ common: "Ошибка при отправке. Попробуйте позже." });
    } catch {
      setErrors({ common: "Ошибка сети. Попробуйте позже." });
    }
    setSending(false);
  }

  function inputClass(err, isTouched) {
    return classNames(
      "block w-full px-4 py-3 rounded-2xl border text-base shadow-sm bg-gradient-to-r from-white to-blue-50 focus:outline-none transition",
      {
        "border-blue-600 focus:border-blue-700 bg-white": !err && isTouched,
        "border-gray-200": !err,
        "border-red-400 focus:border-red-500": !!err,
      }
    );
  }
  function showError(name) {
    return errors[name] && touched[name] ? (
      <div className="text-xs text-red-500 mt-1">{errors[name]}</div>
    ) : null;
  }

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-7">
              <label className="block font-bold mb-2">Фамилия<span className="text-red-500">*</span></label>
              <input
                className={inputClass(errors.lastName, touched.lastName)}
                name="lastName"
                value={data.lastName}
                onChange={handleNameInput}
                onBlur={handleNameInput}
                autoComplete="family-name"
                placeholder="Иванов"
                required
                maxLength={50}
                inputMode="text"
              />
              {showError("lastName")}
            </div>
            <div className="mb-7">
              <label className="block font-bold mb-2">Имя<span className="text-red-500">*</span></label>
              <input
                className={inputClass(errors.firstName, touched.firstName)}
                name="firstName"
                value={data.firstName}
                onChange={handleNameInput}
                onBlur={handleNameInput}
                autoComplete="given-name"
                placeholder="Иван"
                required
                maxLength={50}
                inputMode="text"
              />
              {showError("firstName")}
            </div>
            <div className="mb-7">
              <label className="block font-bold mb-2">Отчество</label>
              <input
                className={inputClass(errors.middleName, touched.middleName)}
                name="middleName"
                value={data.middleName}
                onChange={handleNameInput}
                onBlur={handleNameInput}
                autoComplete="additional-name"
                placeholder="(необязательно)"
                maxLength={50}
                inputMode="text"
              />
              {showError("middleName")}
            </div>
            <div className="mb-7">
              <label className="block font-bold mb-2">Дата рождения<span className="text-red-500">*</span></label>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                <DatePicker
                  value={data.birthDate}
                  onChange={handleDate}
                  maxDate={eighteenYearsAgo}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      className={inputClass(errors.birthDate, touched.birthDate)}
                      error={!!errors.birthDate && touched.birthDate}
                      helperText={touched.birthDate && errors.birthDate ? errors.birthDate : ''}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "ДД.MM.ГГГГ",
                        maxLength: 10,
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              {showError("birthDate")}
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-7">
              <label className="block font-bold mb-2">О себе<span className="text-red-500">*</span></label>
              <textarea
                className={inputClass(errors.about, touched.about) + " min-h-[110px] resize-y"}
                name="about"
                value={data.about}
                onChange={handleInput}
                onBlur={handleInput}
                placeholder="Ваш опыт, навыки, почему вы нам подходите"
                required
                maxLength={1000}
              />
              {showError("about")}
            </div>
            <div className="mb-7">
              <label className="block font-bold mb-2">Резюме (PDF/DOC/DOCX) <span className="text-red-500">*</span></label>
              <input
                className={inputClass(errors.resume, touched.resume) + " file:mr-4 file:rounded-xl file:border-none file:bg-gradient-to-r file:from-blue-500 file:to-indigo-500 file:text-white file:px-4 file:py-2"}
                type="file"
                accept=".pdf,.doc,.docx"
                name="resume"
                ref={fileInput}
                onChange={handleInput}
                required
              />
              {data.resume && (
                <div className="text-xs mt-1 text-gray-500">
                  <span className="font-medium">Файл: </span>
                  {data.resume.name}
                </div>
              )}
              {showError("resume")}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-7">
              <label className="block font-bold mb-2">Телефон<span className="text-red-500">*</span></label>
              <input
                className={inputClass(errors.phone, touched.phone)}
                name="phone"
                value={data.phone}
                onChange={handleInput}
                onBlur={handleInput}
                type="tel"
                placeholder="+7 (999) 123-45-67"
                required
              />
              {showError("phone")}
            </div>
            <div className="mb-7">
              <label className="block font-bold mb-2">Email<span className="text-red-500">*</span></label>
              <input
                className={inputClass(errors.email, touched.email)}
                name="email"
                value={data.email}
                onChange={handleInput}
                onBlur={handleInput}
                type="email"
                placeholder="your@email.com"
                required
              />
              {showError("email")}
            </div>
            <div className="flex items-center gap-2 mt-2 mb-2">
              <input
                type="checkbox"
                name="agree"
                checked={data.agree}
                onChange={handleInput}
                required
                className="accent-blue-600 w-5 h-5 rounded"
              />
              <span className="text-sm text-gray-700">
                Подтверждаю, что ознакомлен(а) с{" "}
                <a href="/privacy" target="_blank" className="underline text-blue-700">
                  политикой обработки персональных данных
                </a>
              </span>
            </div>
            {showError("agree")}
          </motion.div>
        );
      default:
        return null;
    }
  }

  if (success)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl px-7 py-14 shadow-2xl max-w-md mx-auto"
        >
          <svg width="48" height="48" fill="none" className="mx-auto mb-6">
            <circle cx="24" cy="24" r="24" fill="#4f8fff" />
            <path d="M15 25.5l7 7 12-14" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="text-2xl font-bold mb-3 text-center text-blue-900">Спасибо!</h3>
          <div className="text-gray-700 text-center mb-7">
            Ваша заявка успешно отправлена.<br />
            Мы свяжемся с вами в ближайшее время.
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow transition hover:from-blue-700 hover:to-blue-600 w-full"
          >
            На главную
          </button>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-10 px-2">
      {(vacancy.title || vacancy.salary || vacancy.experience) && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-xl mx-auto mb-7 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl border border-blue-200 shadow-lg text-white"
        >
          {vacancy.title && <div className="text-xl font-bold mb-1">{vacancy.title}</div>}
          {vacancy.salary && <div className="font-mono font-semibold mb-1">{vacancy.salary}</div>}
          {vacancy.experience && <div className="text-sm">Опыт: {vacancy.experience}</div>}
        </motion.div>
      )}

      <form
        className="bg-white max-w-xl mx-auto shadow-2xl border border-gray-100 rounded-3xl px-7 py-8"
        onSubmit={handleSend}
        encType="multipart/form-data"
      >
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2 z-0"></div>

          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-blue-600 rounded-full transform -translate-y-1/2 z-0"
            style={{ width: `${(step * 100) / (steps.length - 1)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <div className="relative flex justify-between pl-4 pr-4">
            {steps.map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <motion.div
                  className={classNames(
                    "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all",
                    {
                      "bg-blue-600 text-white border-transparent shadow-lg scale-110": step === i,
                      "bg-white border-blue-600 text-blue-600": step > i,
                      "bg-white border-gray-300 text-gray-400": step < i,
                    }
                  )}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {i + 1}
                </motion.div>
                <span
                  className={classNames(
                    "absolute top-full mt-2 text-xs font-semibold transition-all whitespace-nowrap",
                    step === i ? "text-blue-700" : step > i ? "text-indigo-500" : "text-gray-400"
                  )}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {renderStep()}
        </AnimatePresence>

        {errors.common && (
          <div className="text-red-500 text-sm mt-5 mb-2">{errors.common}</div>
        )}

        <div className="flex items-center justify-between mt-8">
          {step > 0 && (
            <button
              type="button"
              className="text-gray-500 hover:text-gray-900 px-5 py-2 rounded-xl bg-gray-100 font-semibold transition"
              onClick={prevStep}
              disabled={sending}
            >
              Назад
            </button>
          )}
          <div className="flex-1"></div>
          {step < 2 && (
            <button
              type="button"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold shadow transition hover:from-blue-700 hover:to-blue-600"
              onClick={nextStep}
              disabled={Object.keys(validate(data, step)).length > 0 || sending}
            >
              Далее
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold shadow transition hover:from-blue-700 hover:to-blue-600"
              disabled={Object.keys(validate(data, step)).length > 0 || sending}
            >
              {sending ? "Отправка..." : "Отправить"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
