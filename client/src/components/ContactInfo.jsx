import { Mail, Phone, Clock, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1 text-gray-800">
          <Mail size={18} className="text-gray-600" />
          Почта
        </h3>
        <a
          href="mailto:info@pto-ppr.ru"
          className="text-gray-800 hover:text-blue-600 text-sm transition"
        >
          info@pto-ppr.ru
        </a>
      </div>

      <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1 text-gray-800">
          <Phone size={18} className="text-gray-600" />
          Телефон
        </h3>
        <a
          href="tel:+79184522769"
          className="text-gray-800 hover:text-blue-600 text-sm transition"
        >
          +7 (918) 452-27-69
        </a>
        <p className="text-gray-500 text-xs mt-1">Работаем по всей России</p>
      </div>

      <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1 text-gray-800">
          <Clock size={18} className="text-gray-600" />
          Режим работы
        </h3>
        <p className="text-gray-700 text-sm">Пн–Сб: 09:00–20:00</p>
        <p className="text-gray-700 text-sm">Вс: выходной</p>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="w-full h-64">
          <iframe
            title="Карта"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab8c3f7b7559c7d932f69ff633a54504a163e24356c7b95df9587aba328f67d3c&source=constructor"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            className="rounded-b-xl"
          />
        </div>
      </div>
    </div>
  );
}
