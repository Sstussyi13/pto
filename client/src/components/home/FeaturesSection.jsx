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
    <section className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Почему выбирают нас
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-14">
          Мы не просто оформляем документацию. Мы помогаем запускать стройку в срок, без штрафов и с уверенностью в результате.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <div className="flex flex-col items-center text-center">
                {/* Анимация в круге */}
                <div className="w-20 h-20 bg-white rounded-full border border-gray-200 shadow flex items-center justify-center mb-4">
                  <Lottie animationData={item.animation} loop className="w-14 h-14" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
