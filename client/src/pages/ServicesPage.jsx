import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ServiceList from "../components/services/ServiceList";
import ServiceModal from "../components/services/ServiceModal";
import PriceBlock from "../components/price/PriceBlock";


export default function ServicesPage() {
  const [modalContent, setModalContent] = useState(null);

  return (
    <>
      <Helmet>
        <title>Услуги | ПТО / ППР</title>
        <meta name="description" content="Разработка ППР, ПОД, технологических карт, исполнительной документации..." />
        <link rel="canonical" href="https://24ptoppr.ru/services" />
      </Helmet>

      <section className="bg-white text-gray-800 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Услуги ПТО и ППР</h2>
          <p className="text-center text-gray-500 mb-10 text-base">
            Проектируем, согласуем, сопровождаем — под ключ по всей России.
          </p>

          <ServiceList setModalContent={setModalContent} />
          {modalContent && <ServiceModal content={modalContent} onClose={() => setModalContent(null)} />}

          {/* Блок с таблицей и калькулятором */}
         <div className="mt-20 w-full">
  <PriceBlock />
</div>



          {/* 👉 Кнопка "Оставить заявку" по центру внизу */}
          <div className="text-center mt-16">
  <Link
    to="/contacts"
    className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition"
  >
    Отправить заявку 
  </Link>
</div>

        </div>
      </section>
    </>
  );
}
