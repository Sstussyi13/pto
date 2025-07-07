import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ServiceList from "../components/services/ServiceList";
import ServiceModal from "../components/services/ServiceModal";
import PriceBlock from "../components/price/PriceBlock";

export default function ServicesPage() {
  const [modalContent, setModalContent] = useState(null);

  return (
    <>
      <Helmet>
        <title>Услуги | ПТО / ППР</title>
        <meta
          name="description"
          content="Разработка ППР, ПОД, технологических карт, исполнительной документации и согласование с контролирующими органами. Работаем по всей России."
        />
        <meta
          name="keywords"
          content="ППР, ПОД, техкарты, исполнительная документация, услуги ПТО, проектирование, сопровождение строительства"
        />
        <link rel="canonical" href="https://24ptoppr.ru/services" />

        <meta property="og:title" content="Услуги | ПТО / ППР" />
        <meta property="og:description" content="Услуги по проектированию и сопровождению: ППР, ПОД, техкарты, исполнительная документация. Работаем по всей России." />
        <meta property="og:url" content="https://24ptoppr.ru/services" />
        <meta property="og:image" content="https://24ptoppr.ru/preview-services.jpg" />

        <meta name="twitter:title" content="Услуги | ПТО / ППР" />
        <meta name="twitter:description" content="Профессиональная разработка и согласование ППР, ПОД, техкарт и исполнительной документации. По всей РФ." />
        <meta name="twitter:image" content="https://24ptoppr.ru/preview-services.jpg" />
      </Helmet>

      <section className="bg-white text-gray-800 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Услуги ПТО и ППР</h2>
          <p className="text-center text-gray-500 mb-10 text-base">
            Проектируем, согласуем, сопровождаем — под ключ по всей России.
          </p>

          <ServiceList setModalContent={setModalContent} />
          {modalContent && <ServiceModal content={modalContent} onClose={() => setModalContent(null)} />}
          <PriceBlock />
        </div>
      </section>
    </>
  );
}
