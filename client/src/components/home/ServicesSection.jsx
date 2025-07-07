import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ServicesSection() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get("/api/content/cards");
        if (Array.isArray(res.data?.value)) {
          setCards(res.data.value);
        }
      } catch (err) {
        console.error("Ошибка загрузки карточек:", err);
      }
    };

    fetchCards();
  }, []);

  if (!cards.length) return null;

  return (
    <section className="bg-white py-20 px-4 sm:px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Что мы делаем</h2>
        <p className="mb-12 text-gray-500 text-base max-w-2xl mx-auto">
          Мы разрабатываем документацию под ключ: от ППР и ПОС до схем, графиков и технологических карт. Наши проекты проходят проверку и согласования без задержек.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {cards.map((item, idx) => (
            <Link
              to={item.link}
              key={idx}
              className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm
                transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:scale-[1.03]"
            >
              <div className="relative h-60 w-full">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              </div>
              <div className="absolute bottom-0 z-20 p-5 w-full flex flex-col justify-end">
                <h3 className="text-white text-xl font-semibold mb-1">{item.label}</h3>
                {item.description && (
                  <p className="text-white/90 text-sm mb-1 leading-snug line-clamp-2">{item.description}</p>
                )}
                <div className="text-white opacity-80 transition-transform group-hover:translate-x-1">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
