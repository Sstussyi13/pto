import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

export default function Contacts() {
  return (
    <section className="bg-gray-50 py-24 px-4 sm:px-6">
      <Helmet>
        <title>Контакты | ПТО / ППР</title>
        <meta
          name="description"
          content="Свяжитесь с нами для консультации, расчёта стоимости и получения ППР. Работаем по всей России."
        />
        <meta
          name="keywords"
          content="контакты, обратная связь, ППР, проектирование, техническая документация, заказать ППР, ПТО"
        />
        <link rel="canonical" href="https://24ptoppr.ru/contacts" />
        <meta property="og:title" content="Контакты | ПТО / ППР" />
        <meta property="og:description" content="Оставьте заявку или свяжитесь с нами для расчёта стоимости ППР. Работаем по всей России." />
        <meta property="og:url" content="https://24ptoppr.ru/contacts" />
        <meta property="og:image" content="https://24ptoppr.ru/preview.jpg" />
        <meta name="twitter:title" content="Контакты | ПТО / ППР" />
        <meta name="twitter:description" content="Свяжитесь с нашей командой для консультации по ППР и технической документации." />
        <meta name="twitter:image" content="https://24ptoppr.ru/preview.jpg" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Свяжитесь с нами</h1>
          <p className="text-gray-600 text-base sm:text-lg mt-3">
            Оставьте заявку — мы ответим в течение часа в рабочее время.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div data-aos="fade-up" data-aos-delay="0">
            <ContactForm />
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
