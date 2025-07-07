import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="bg-gray-800 text-white py-16 px-4 sm:px-6 text-center mt-16">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-4 leading-tight">
          Нужен ППР или проект для строительства?
        </h3>
        <p className="mb-4 text-gray-300 text-base">
          Мы подберём оптимальное решение, подготовим техническую документацию и
          обеспечим её соответствие нормативам. Работаем по всей России.
        </p>
        <p className="mb-6 text-sm text-gray-400 italic">
           Ответим в течение 15 минут в рабочее время. Консультация бесплатна.
        </p>
        <Link
          to="/contacts"
          className="inline-block w-full sm:w-auto bg-white text-gray-800 font-semibold px-6 py-3 rounded-full hover:bg-gray-300 transition"
        >
          Оставить заявку
        </Link>
      </div>
    </section>
  );
}
