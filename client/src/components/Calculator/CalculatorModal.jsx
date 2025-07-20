import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ContactForm from "../ContactForm";
import AnimatedNumber from "./AnimatedNumber";

export default function CalculatorModal({
  onClose,
  initialData,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleOverlayClick(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  }

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const handleWheel = e => { e.stopPropagation(); };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const safeFormat = (n) => (typeof n === "number" ? n.toLocaleString("ru-RU") : "0");

  function renderInfoBlock() {
    const {
      objectType,
      objectArea,
      estimateValue,
      sections,
      estimatedPrice
    } = initialData || {};

    return (
      <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 mt-6 text-[15px] text-gray-900">
        <div><b>Тип объекта:</b> {objectType || <span className="text-gray-400">—</span>}</div>
        <div><b>Площадь:</b> {objectArea || <span className="text-gray-400">—</span>} м²</div>
        <div><b>Сметная стоимость:</b> {estimateValue || <span className="text-gray-400">—</span>} ₽</div>
        <div className="mt-2"><b>Выбранные разделы:</b></div>
        <ul className="list-disc pl-5 mb-2">
          {sections && sections.length > 0
            ? sections.map((sec, i) => <li key={i}>{sec}</li>)
            : <li className="text-gray-400">—</li>
          }
        </ul>
        <div className="mt-4 text-lg font-bold text-neutral-900 flex flex-col items-start">
          <span>
            Предварительная стоимость:
            <span style={{ fontSize: "1.35em" }}>
              <AnimatedNumber value={estimatedPrice ?? 0} format={n => safeFormat(n)} />
              {" "}₽
            </span>
          </span>
          <span className="text-gray-500 text-xs mt-1">
            Это ориентировочная сумма. Точная стоимость будет рассчитана после обсуждения проекта.
          </span>
        </div>
      </div>
    );
  }

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleOverlayClick}
        aria-hidden="true"
        style={{ touchAction: "none" }}
      />
      <div className="fixed inset-0 z-[130] flex items-center justify-center pointer-events-none select-none">
        <div
          ref={modalRef}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[97vh] p-0 flex flex-col overflow-auto pointer-events-auto select-text animate-modal-appear"
          tabIndex={0}
          style={{ boxShadow: "0 10px 38px 0 rgba(26,30,68,0.18)" }}
          onClick={e => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-4 right-6 md:right-8 text-3xl font-light text-gray-500 hover:text-gray-800 focus:outline-none transition z-30 modal-close-btn"
            onClick={onClose}
            title="Закрыть"
            aria-label="Закрыть"
            style={{ lineHeight: 1, padding: '0 8px' }}
          >
            ×
          </button>
          <div
            className="overflow-y-auto p-6 pt-14 flex-1 custom-scroll"
            style={{ maxHeight: "calc(97vh - 2rem)" }}
          >
            <h2 className="text-lg font-semibold mb-5 text-center modal-title-center w-full">
              Ваша заявка
            </h2>

            <ContactForm
              initialData={initialData}
              onSuccess={onClose}
              buttonClassName="w-full py-3 rounded-lg bg-[#193a6a] text-white font-semibold border border-[#193a6a]
                transition hover:bg-[#10244a] shadow-md text-base"
            />
            {renderInfoBlock()}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modal-appear {
          0% { opacity: 0; transform: translateY(48px) scale(0.97);}
          100% { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-modal-appear { animation: modal-appear 0.22s cubic-bezier(.55,.04,.43,1.19); }
        .custom-scroll::-webkit-scrollbar { width: 7px; background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scroll:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }

        @media (max-width: 768px) {
          .modal-close-btn {
            top: 0.5rem !important;
            right: 0.5rem !important;
            font-size: 2.2rem !important;
          }
          .modal-title-center {
            padding-left: 0 !important;
            text-align: center !important;
            width: 100% !important;
            display: block;
          }
        }
      `}</style>
    </>,
    document.body
  );
}
