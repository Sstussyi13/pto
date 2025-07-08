import { MapPin } from "lucide-react";

export default function YandexMap() {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin size={18} /> Мы на карте
      </h3>
      <div className="w-full h-64 sm:h-72 rounded-md overflow-hidden border shadow-sm">
        <iframe
          title="Яндекс Карта — Москва, Лечебная 5"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab8c3f7b7559c7d932f69ff633a54504a163e24356c7b95df9587aba328f67d3c&source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
