import { useEffect } from "react";

export default function ServiceModal({ content, onClose }) {
  // 🔒 Блокируем скролл body при открытии
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ""; // Возвращаем скролл при закрытии
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto mx-4 sm:mx-0 p-6 rounded-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl focus:outline-none"
          aria-label="Закрыть модальное окно"
        >
          ×
        </button>

        <h4 className="text-2xl font-bold mb-4 text-gray-900">{content.title}</h4>

        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {content.details}
        </p>
      </div>
    </div>
  );
}
