import {
  Briefcase,
  BookText,
  ClipboardList,
  FileCheck2,
  Headphones,
  MapPinned,
} from "lucide-react";

const FEATURES = [
  {
    icon: Briefcase,
    title: "Инженерный подход",
    description: "Каждый проект — результат опыта, расчёта и знания нормативов.",
  },
  {
    icon: BookText,
    title: "Документация под ключ",
    description: "Готовим полный комплект от ППР и ПОС до актов и схем.",
  },
  {
    icon: ClipboardList,
    title: "Проверка и согласование",
    description: "Проекты проходят экспертизу и согласования без задержек.",
  },
  {
    icon: FileCheck2,
    title: "Гарантия соответствия",
    description: "Все документы соответствуют СНиП, СП и ГОСТам.",
  },
  {
    icon: Headphones,
    title: "Поддержка на связи",
    description: "Оперативно отвечаем на вопросы и вносим правки без бюрократии.",
  },
  {
    icon: MapPinned,
    title: "Работаем по всей России",
    description: "Официально, с учётом региональных требований и норм.",
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Документы, которым доверяют
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12">
          Мы делаем не просто проект — мы помогаем вам пройти проверку, согласовать документацию и избежать рисков на стройке.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {FEATURES.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-start gap-5 p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            {/* Иконка в круге */}
            <div className="min-w-12 w-12 h-12 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center">
              <feature.icon className="w-5 h-5 text-gray-800" />
            </div>

            {/* Контент */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
