import { motion } from "framer-motion";
import {
  FileText, Ruler, ShieldCheck, Lightbulb, UserCheck, Zap
} from "lucide-react";

const features = [
  {
    title: "Реальная экспертиза",
    desc: "Документы проходят не просто подпись, а глубокую проверку инженерами: ошибки и нюансы исключены.",
    icon: <ShieldCheck className="w-7 h-7 text-[#193a6a] group-hover:text-sky-700 transition" />,
  },
  {
    title: "Техническое сопровождение",
    desc: "Ведём проект до результата: вносим правки, отвечаем быстро, консультируем на каждом этапе.",
    icon: <UserCheck className="w-7 h-7 text-[#193a6a] group-hover:text-sky-700 transition" />,
  },
  {
    title: "Современные решения",
    desc: "Работаем с BIM, цифровой подписью и автоматизацией — ускоряем согласования и гарантируем соответствие.",
    icon: <Lightbulb className="w-7 h-7 text-[#193a6a] group-hover:text-sky-700 transition" />,
  },
  {
    title: "Фиксированная цена",
    desc: "Прозрачные договоры — финальная стоимость прописана в контракте, без “допов” и скрытых пунктов.",
    icon: <FileText className="w-7 h-7 text-[#193a6a] group-hover:text-sky-700 transition" />,
  },
  {
    title: "Юридическая чистота",
    desc: "Гарантия: все проекты проходят любые проверки и соответствуют требуемым стандартам и нормам.",
    icon: <Ruler className="w-7 h-7 text-[#193a6a] group-hover:text-sky-700 transition" />,
  },
  {
    title: "Экстренное подключение",
    desc: "Подключаемся к проекту в течение 1 дня, если есть срочная задача, и закрываем её оперативно.",
    icon: <Zap className="w-7 h-7 text-[#193a6a] group-hover:text-sky-700 transition" />,
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#193a6a] mb-8">
          Почему нам доверяют инженеры и застройщики
        </h2>
        <p className="text-neutral-600 text-lg max-w-2xl mx-auto mb-14">
          Только проверенные решения, никакого “маркетинга” — результат, скорость, надёжность.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {features.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: 0.07 + idx * 0.08, duration: 0.52, ease: "easeOut" }}
              whileHover={{
                y: -8,
                boxShadow: "0 10px 32px 0 rgba(31,41,55,0.10)",
                scale: 1.025,
                transition: { duration: 0.22 }
              }}
              className={`
                flex flex-col h-full items-center rounded-2xl border border-[#e5eaf3] bg-white shadow-sm transition-all
                group min-h-[290px] px-7 py-8 hover:border-sky-300 hover:bg-sky-50/10
              `}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full mb-5 bg-[#f4f7fb] border border-[#e5eaf3] transition">
                {item.icon}
              </div>
              <span className="font-semibold text-lg text-[#193a6a] mb-2">{item.title}</span>
              <p className="text-neutral-700 text-[15px] leading-relaxed mb-5 max-w-[270px]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
