import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="w-full bg-gradient-to-r from-[#1d2840] via-[#22386a] to-[#193a6a] py-16 px-4 sm:px-0 mt-16 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            Подготовим ППР или проект —<br className="hidden sm:block" />
            <span className="text-blue-200"> быстро, грамотно, под ключ</span>
          </h3>
          <p className="text-base sm:text-lg text-blue-100 mb-0 font-normal max-w-2xl">
            Бесплатная консультация. Поможем пройти экспертизу, оформить документы и запустить стройку без лишних рисков.
          </p>
        </div>
        <div className="flex-1 flex sm:justify-end justify-center mt-7 sm:mt-0">
          <Link
            to="/contacts"
            className="
              inline-flex items-center gap-2
              bg-white text-[#193a6a] font-semibold px-7 py-3 rounded-full
              shadow hover:bg-blue-100 hover:text-[#22386a]
              active:scale-95 transition-all duration-200
              text-base sm:text-lg
              border border-blue-100
            "
          >
            <Mail className="w-5 h-5" />
            Оставить заявку
          </Link>
        </div>
      </div>
    </section>
  );
}
