import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Ruler, FileStack, CheckCircle2, ShieldCheck, Headphones, Globe2
} from "lucide-react";

const FEATURES = [
  {
    title: "Инженерный подход",
    description: "Каждый проект — результат опыта, расчёта и знания нормативов.",
    extra: "По СНИП и ГОСТ",
    icon: <Ruler className="w-7 h-7 text-[#193a6a] mb-3" strokeWidth={1.5} />,
  },
  {
    title: "Документация под ключ",
    description: "Готовим полный комплект: от ППР и ПОС до актов и схем.",
    extra: "Всё включено",
    icon: <FileStack className="w-7 h-7 text-[#193a6a] mb-3" strokeWidth={1.5} />,
  },
  {
    title: "Проверка и согласование",
    description: "Проекты проходят экспертизу и согласования без задержек.",
    extra: "Экспертиза",
    icon: <CheckCircle2 className="w-7 h-7 text-[#193a6a] mb-3" strokeWidth={1.5} />,
  },
  {
    title: "Гарантия соответствия",
    description: "Все документы соответствуют СНиП, СП и ГОСТам.",
    extra: "Юридически чисто",
    icon: <ShieldCheck className="w-7 h-7 text-[#193a6a] mb-3" strokeWidth={1.5} />,
  },
  {
    title: "Поддержка на связи",
    description: "Оперативно отвечаем на вопросы и вносим правки без бюрократии.",
    extra: "Всегда на связи",
    icon: <Headphones className="w-7 h-7 text-[#193a6a] mb-3" strokeWidth={1.5} />,
  },
  {
    title: "Работаем по всей России",
    description: "Официально, с учётом региональных требований и норм.",
    extra: "По всей РФ",
    icon: <Globe2 className="w-7 h-7 text-[#193a6a] mb-3" strokeWidth={1.5} />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#f6f8fa]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#193a6a] mb-4 text-center">
          Документы, которым доверяют
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12 text-center">
          Мы делаем не просто проект — мы помогаем вам пройти проверку, согласовать документацию и избежать рисков на стройке.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                delay: 0.07 * idx,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card className="h-full flex flex-col rounded-xl border border-[#e5eaf3] shadow-sm hover:shadow-md transition-all bg-white">
                <CardContent className="flex flex-col flex-1 p-7 items-start text-left">
                  <div className="mb-3">{feature.icon}</div>
                  <span className="font-semibold text-lg text-[#193a6a] mb-1">{feature.title}</span>
                  <div className="text-gray-700 text-base leading-relaxed flex-1 mb-5">
                    {feature.description}
                  </div>
                  <div className="mt-auto">
                    <Badge
                      variant="outline"
                      className="text-[#193a6a] border-[#e5eaf3] bg-[#f4f7fb] px-3 py-1 text-xs rounded font-semibold shadow-none"
                    >
                      {feature.extra}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
