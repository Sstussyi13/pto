import Lottie from "lottie-react";
import experienceAnimation from "../../assets/experience.json";
import workAnimation from "../../assets/work.json";
import brainAnimation from "../../assets/brain.json";

const features = [
  {
    title: "10+ лет опыта",
    text: "Мы проектируем объекты любой сложности — от частных участков до крупных инфраструктурных проектов. Работаем с ТЦ, ЖК, производствами, ВЛ 110 кВ и др.",
    animation: brainAnimation,
  },
  {
    title: "Работаем по всей России",
    text: "Знаем и учитываем региональные нормы, СП, СНиП и требования заказчиков. Документы проходят согласования в МОЭК, Россетях, Мосводоканале и др.",
    animation: workAnimation,
  },
  {
    title: "Сжатые сроки — от 3 дней",
    text: "Проекты под ключ с технической частью, графиками и пояснительными записками. Гарантируем соответствие нормативам и оперативную связь.",
    animation: experienceAnimation,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Почему выбирают нас</h2>
        <p className="text-gray-500 mb-12 text-base">
          Мы — команда инженеров, архитекторов и экспертов, которая помогает бизнесу и строительным компаниям запускать объекты вовремя и без лишней бюрократии.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 shrink-0">
                  <Lottie animationData={item.animation} loop />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
