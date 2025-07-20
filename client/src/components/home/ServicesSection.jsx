import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ServicesSection() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios.get("/api/content/cards").then(res => {
      if (Array.isArray(res.data?.value)) setCards(res.data.value);
    });
  }, []);
  if (!cards.length) return null;

  return (
    <section className="bg-white py-20 px-4 sm:px-6 border-t border-[#e5eaf3]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[#193a6a]">
          Разделы сайта
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((item, idx) => (
            <Card
  key={idx}
  className={`
    group relative flex flex-col items-center justify-center
    rounded-2xl border border-blue-100 bg-white shadow-md
    hover:shadow-xl hover:border-[#193a6a] transition-all duration-300
    min-h-[340px] h-[340px] overflow-hidden cursor-pointer
  `}
>

  <div className="absolute inset-0 w-full h-full z-0">
    <img
      src={item.image}
      alt={item.label}
      className="w-full h-full object-cover object-center"
      style={{ filter: "brightness(0.66) blur(0px)" }}
      draggable={false}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#193a6a]/80 via-[#193a6a]/10 to-transparent" />
  </div>

  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 py-8 text-center">
    <h3 className="font-bold text-2xl text-white mb-3 drop-shadow-lg">
      {item.label}
    </h3>
    <p className="text-white/90 text-base leading-relaxed mb-6 line-clamp-3 drop-shadow">
      {item.description}
    </p>
    <Link
      to={item.link}
      className="inline-block mt-auto text-base font-semibold rounded-lg border-2 border-white text-white bg-white/10 hover:bg-white/25 px-7 py-2 transition shadow"
      tabIndex={0}
    >
      Подробнее
    </Link>
  </div>
</Card>

          ))}
        </div>
      </div>
    </section>
  );
}
