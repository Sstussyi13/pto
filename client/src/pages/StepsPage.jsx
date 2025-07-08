import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

import StepsSection from "../components/steps/StepsSection";
import { Link } from "react-router-dom";

export default function StepsPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-white py-20 px-4 text-gray-800">
      <Helmet>
        <title>Этапы работы | ПТО / ППР</title>
        <meta
          name="description"
          content="Как мы работаем: от заявки до итоговой документации. Чёткий, прозрачный процесс выполнения ППР и проектных работ."
        />
        <link rel="canonical" href="https://24ptoppr.ru/steps" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Этапы работы | ПТО / ППР" />
        <meta
          property="og:description"
          content="Узнайте, как проходит каждый этап: заявка, согласование, проектирование и сдача ППР-документации."
        />
        <meta property="og:url" content="https://24ptoppr.ru/steps" />
        <meta property="og:image" content="https://ваш-домен.рф/preview-steps.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Этапы работы | ПТО / ППР" />
        <meta
          name="twitter:description"
          content="Процесс сопровождения ППР: от консультации до финальной сдачи документации. Работаем по всей России."
        />
        <meta name="twitter:image" content="https://ваш-домен.рф/preview-steps.jpg" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Этапы работы</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-base">
          Сопровождаем проект от первого звонка до финальной сдачи документации.
        </p>

        <StepsSection />

        <div className="text-center mt-16">
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition"
          >
            Обсудить проект
          </Link>
        </div>
      </div>
    </section>
  );
}
