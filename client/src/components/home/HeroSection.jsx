import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-[640px] w-full bg-black">
      <img
        src="https://res.cloudinary.com/djs7milq9/image/upload/construction_sgpitm"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] z-0"
        alt="Строительство"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-10 max-w-3xl text-center text-white shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Проектирование ППР и техническая документация
          </h1>
          <p className="text-lg mb-2 text-white/80">
            Производственно-технический отдел (ПТО) / Проекты производства работ (ППР)
          </p>
          <p className="text-sm mb-8 text-gray-300">
            Работаем по всей России. Сдаём под ключ — официально, по ГОСТ и СНиП.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contacts"
              className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Оставить заявку
            </Link>
            <Link
              to="/services"
              className="text-white/80 hover:text-white underline text-sm transition"
            >
              Посмотреть примеры работ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
