import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import VacanciesBlock from "../components/vacancies/VacanciesBlock"; 

export default function Contacts() {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6">
      <Helmet>
        <title>Контакты | ПТО / ППР</title>
        <meta
          name="description"
          content="Свяжитесь с нами для консультации, расчёта стоимости и получения ППР. Работаем по всей России."
        />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#193a6a]">Свяжитесь с нами</h1>
          <p className="text-gray-600 text-base sm:text-lg mt-3">
            Оставьте заявку — мы ответим в течение часа в рабочее время.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div data-aos="fade-up" data-aos-delay="0">
            <ContactForm />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <ContactInfo />
          </div>
        </div>
      </div>
      <VacanciesBlock />
    </section>
  );
}
