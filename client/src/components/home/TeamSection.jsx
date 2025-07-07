import { LifeBuoy, Timer, Globe } from "lucide-react";

export default function TeamSection() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-200">
            <img
              src="https://res.cloudinary.com/djs7milq9/image/upload/engenier_jlziqn"
              alt="Инженеры"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Команда профессионалов</h2>
          <p className="text-gray-500 mb-6 text-base leading-relaxed">
            Наши специалисты — опытные инженеры, архитекторы и проектировщики. Мы сопровождаем проект на каждом этапе, 
            учитываем нормативную базу и предлагаем решения, которые действительно работают.
          </p>

          <ul className="space-y-4 text-gray-800 text-base">
            <li className="flex items-start gap-3">
              <LifeBuoy size={22} className="mt-1 text-black" />
              <span><strong>Поддержка</strong> — от запроса до согласования</span>
            </li>
            <li className="flex items-start gap-3">
              <Timer size={22} className="mt-1 text-black" />
              <span><strong>Сроки и прозрачная стоимость</strong> — без скрытых условий</span>
            </li>
            <li className="flex items-start gap-3">
              <Globe size={22} className="mt-1 text-black" />
              <span><strong>Работаем по всей России</strong> — с учётом региональных норм</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
