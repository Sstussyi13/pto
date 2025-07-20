import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "bg-[#193a6a]";

const faqs = [
  {
    question: "Сколько времени занимает разработка ППР?",
    answer: "Обычно — от 3 рабочих дней, но зависит от сложности. Срочные заказы — обсуждаем индивидуально.",
  },
  {
    question: "Какие документы входят в состав ППР?",
    answer: "Графики, пояснительная записка, схемы, технологические карты, ТБ — в зависимости от работ.",
  },
  {
    question: "Сколько стоит разработка ППР?",
    answer: "Цена зависит от объёма и сроков. Точную смету даём после анализа задания. Базовые проекты — от 15 000 ₽.",
  },
  {
    question: "Согласуете ли ППР в МОЭК, Россетях и др.?",
    answer: "Да, у нас опыт согласований в МОЭК, Мосводоканале, Ленэнерго, Россетях и других структурах.",
  },
  {
    question: "Как быстро вы отвечаете на заявки?",
    answer: "В рабочее время — в течение часа. Вечером и ночью — утром следующего дня.",
  },
  {
    question: "Можете выдать акты или гарантийные письма?",
    answer: "Да. Предоставляем официальные акты выполненных работ и гарантийные письма при необходимости.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const refs = useRef([]);
  const [heights, setHeights] = useState([]);

  useEffect(() => {
    setHeights(refs.current.map((el) => el?.scrollHeight || 0));
    const onResize = () => setHeights(refs.current.map((el) => el?.scrollHeight || 0));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#f6f8fa] border-t border-[#e5eaf3]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#193a6a]">Частые вопросы</h2>
          <p className="mt-4 text-gray-700 text-base">
            Всё по-честному: отвечаем открыто на популярные вопросы. Остались сомнения?{" "}
            <Link
              to="/contacts"
              className="text-[#193a6a] underline underline-offset-2 hover:text-blue-800 transition"
              tabIndex={0}
            >
              Напишите нам — ответим быстро
            </Link>
            .
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`
                  group cursor-pointer rounded-xl border transition-all
                  ${isOpen
                    ? "border-[#193a6a] shadow-lg bg-white"
                    : "border-[#e5eaf3] bg-white hover:border-[#193a6a]/80"}
                  relative overflow-hidden
                `}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
              >

                <div className={`
                  absolute left-0 top-0 h-full w-1.5
                  rounded-r-lg ${ACCENT} transition-all
                  ${isOpen ? "opacity-100" : "opacity-0"}
                `} />
                <div className="flex items-center px-8 py-6 gap-4 relative z-10">
                  <h3 className={`
                    flex-1 text-left text-lg font-semibold transition
                    ${isOpen ? "text-[#193a6a]" : "text-gray-900"}
                  `}>
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`
                      transition-transform duration-400
                      ${isOpen ? "rotate-180 text-[#193a6a]" : "text-gray-400 group-hover:text-[#193a6a]/80"}
                    `}
                  />
                </div>
                <div
                  ref={el => refs.current[idx] = el}
                  style={{
                    maxHeight: isOpen ? `${heights[idx] || 120}px` : "0px",
                  }}
                  className={`
                    overflow-hidden transition-[max-height] duration-500 ease-in-out
                  `}
                >
                  <div className="px-8 pb-6 pt-0">
                    <div className={`
                      text-gray-700 text-base leading-relaxed
                      transition-opacity duration-500
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                    `}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
