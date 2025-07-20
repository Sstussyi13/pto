import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CalculatorForm from "../components/Calculator/CalculatorForm";
import "aos/dist/aos.css";

export default function CalculatorPage() {
  useEffect(() => {
    import("aos").then(AOS => AOS.init({ duration: 800, once: true }));
  }, []);

  return (
    <section
      className="max-w-5xl mx-auto px-4 py-12"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <Helmet>
        <title>Калькулятор стоимости | ПТО / ППР</title>
        <meta
          name="description"
          content="Быстрый расчет стоимости проектной документации. Заполните онлайн-калькулятор — узнайте цену и отправьте заявку."
        />
        <link rel="canonical" href="https://24ptoppr.ru/calculator" />
      </Helmet>
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#193a6a]">
          Калькулятор стоимости
        </h1>
        <p className="mb-0 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
          Используйте калькулятор для предварительной оценки стоимости проектной документации. Заполните поля ниже, чтобы получить расчет и отправить заявку.
        </p>
      </div>
      <div className="flex justify-center">
        <CalculatorForm />
      </div>
    </section>
  );
}
