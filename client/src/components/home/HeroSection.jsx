import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-[480px] h-[60vh] md:h-[660px] w-full bg-black overflow-hidden">

      <img
        src="https://res.cloudinary.com/djs7milq9/image/upload/photo_2025-07-15_14-36-08_a4gcuv"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] z-0"
        alt="Строительство"
        draggable={false}
      />


      <div className="absolute inset-0 bg-black/40 z-10" />


      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="backdrop-blur-[6px] bg-white/25 border border-white/35 rounded-2xl p-5 sm:p-10 max-w-xl sm:max-w-2xl md:max-w-3xl text-center text-white shadow-2xl w-full">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow">
            Проектирование ППР и<br /> техническая документация
          </h1>
          <p className="text-base sm:text-lg mb-3 text-white/90 font-medium">
            Производственно-технический отдел (ПТО) / Проекты производства работ (ППР)
          </p>
          <p className="text-xs sm:text-sm mb-8 text-blue-100">
            Работаем по всей России. Сдаём под ключ — официально, по ГОСТ и СНиП.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contacts"
              className="
                bg-white text-[#193a6a] font-semibold px-7 py-3 rounded-full
                hover:bg-blue-100 hover:text-[#193a6a] transition w-full sm:w-auto
                shadow
              "
            >
              Оставить заявку
            </Link>
            <Link
              to="/services"
              className="
                text-white/90 hover:text-blue-200 underline text-sm transition
                w-full sm:w-auto text-center
              "
            >
              Посмотреть примеры работ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
