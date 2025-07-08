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
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Что мы делаем</h2>
        <p className="mb-14 text-gray-500 text-base max-w-2xl mx-auto">
          Мы разрабатываем документацию под ключ: от ППР и ПОС до схем, графиков и технологических карт. Наши проекты проходят проверку и согласования без задержек.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {cards.map((item, idx) => (
            <Link
              to={item.link}
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-md transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="relative h-60 w-full bg-gray-100">
                <img
                  src={item.image || "https://res.cloudinary.com/your-cloud-name/image/upload/default-placeholder.jpg"}
                  alt={item.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter-none"
                  style={{
                    imageRendering: "auto",
                    backfaceVisibility: "hidden",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
              </div>

              <div className="absolute bottom-0 z-20 p-5 w-full flex flex-col justify-end">
                <h3 className="text-white text-xl font-semibold mb-1">{item.label}</h3>
                {item.description && (
                  <p className="text-white/90 text-sm mb-1 leading-snug line-clamp-2">
                    {item.description}
                  </p>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white opacity-80 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
