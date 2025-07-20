import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
          content="Разработка ППР, ПОД, технологических карт, исполнительной документации..."
        />
        <link rel="canonical" href="https://24ptoppr.ru/services" />
      </Helmet>

      <section className="bg-gradient-to-b from-[#f7fafd] via-white to-white text-gray-800 py-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-[#193a6a]">
            Услуги ПТО и ППР
          </h2>
          <p className="text-center text-gray-500 mb-10 text-lg">
            Проектируем, согласуем, сопровождаем — под ключ по всей России.
          </p>

          <ServiceList setModalContent={setModalContent} />

          {modalContent && (
            <ServiceModal content={modalContent} onClose={() => setModalContent(null)} />
          )}

          <div className="mt-20 w-full">
            <PriceBlock />
          </div>

          <div className="text-center mt-16">
            <div className="inline-block">
              <Link
  to="/calculator"
  className="
    inline-flex items-center gap-2
    bg-[#193a6a] text-white font-semibold px-7 py-3 rounded-full shadow-xl
    hover:bg-[#10244a] hover:scale-105 active:scale-95
    transition-all duration-200 text-lg focus:outline-none
  "
>
  Рассчитать стоимость
</Link>

            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
