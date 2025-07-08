import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Сколько времени занимает разработка ППР?",
    answer: "Средний срок — от 3 рабочих дней, в зависимости от сложности проекта. Мы можем согласовать срочные заказы.",
  },
  {
    question: "Какие документы входят в состав ППР?",
    answer: "Это зависит от типа работ, но обычно включаются: графики, пояснительная записка, схемы, технологические карты, ТБ.",
  },
  {
    question: "Сколько стоит разработка ППР?",
    answer: "Стоимость зависит от объёма работ и сроков. Мы предоставим точную смету после анализа задания. Базовые проекты — от 15 000 ₽.",
  },
  {
    question: "Вы работаете по всей России?",
    answer: "Да. Мы создаём проекты с учётом региональных требований и СНИПов, и доставляем документы онлайн.",
  },
  {
    question: "Вы можете согласовать ППР в МОЭК или сетевых организациях?",
    answer: "Да, у нас есть опыт согласования в МОЭК, Мосводоканале, Ленэнерго, Россетях и других структурах.",
  },
  {
    question: "Как быстро вы отвечаете на заявки?",
    answer: "В рабочее время — в течение 1 часа. Вне графика — утром следующего дня.",
  },
  {
    question: "Вы предоставляете акты или гарантийные письма?",
    answer: "Да. Мы предоставляем официальные акты выполненных работ и гарантийные письма при необходимости.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);
  const containerRefs = useRef([]);

  // Обновляем высоту при монтировании и ресайзе
  const getHeight = (el) => el?.scrollHeight || 0;

  const toggle = (index) => {
    const isSame = openIndex === index;
    setOpenIndex(isSame ? null : index);

    if (!isSame && containerRefs.current[index]) {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        setTimeout(() => {
          containerRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Частые вопросы</h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base">
            Мы собрали самые популярные вопросы, чтобы сэкономить ваше время. Если останутся сомнения — свяжитесь с нами напрямую.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                ref={(el) => (containerRefs.current[idx] = el)}
                className={`border border-gray-300 rounded-xl bg-white transition-all duration-300 ${
                  isOpen ? "shadow-md" : "hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-180 text-blue-600" : "text-gray-500"
                    }`}
                  />
                </button>

                <div
                  ref={(el) => (contentRefs.current[idx] = el)}
                  style={{
                    maxHeight: isOpen ? `${getHeight(contentRefs.current[idx])}px` : "0px",
                  }}
                  className="overflow-hidden transition-[max-height] duration-500 ease-in-out will-change-[max-height]"
                >
                  <div className="px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed">
                    {item.answer}
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
