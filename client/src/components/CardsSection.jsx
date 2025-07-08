import { useEffect, useState } from "react";
import axios from "axios";

export default function CardsSection() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE;

    const fetchCards = async () => {
      try {
        const res = await axios.get(`${API_BASE}/content/all`);

        if (!Array.isArray(res.data)) {
          console.error("Неверный формат ответа от сервера:", res.data);
          return;
        }

        const data = res.data.find((item) => item.key === "cards");

        if (!data) {
          console.warn("Карточки не найдены в данных.");
          return;
        }

        try {
          const parsed = JSON.parse(data.value);
          if (Array.isArray(parsed)) {
            setCards(parsed);
          } else {
            console.error("Ожидался массив карточек, получено:", parsed);
          }
        } catch (parseErr) {
          console.error("Ошибка парсинга JSON карточек:", parseErr);
        }
      } catch (err) {
        console.error("Ошибка при загрузке карточек:", err);
      }
    };

    fetchCards();
  }, []);

  if (!cards.length) return null;

  return (
    <section className="bg-white py-20 px-4 sm:px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Что мы делаем</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {cards.map((item) => (
            <a
              key={item.link || item.id || item.label}
              href={item.link}
              className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm
                        transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                        hover:scale-[1.03]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative h-60 w-full">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              </div>

              <div className="absolute bottom-0 z-20 p-5 w-full flex flex-col justify-end">
                <h3 className="text-white text-xl font-semibold mb-2">{item.label}</h3>
                <div className="text-white opacity-80 transition-transform group-hover:translate-x-1">→</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
