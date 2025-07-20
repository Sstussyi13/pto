import { useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import ReactDOM from "react-dom";
import SimpleBar from "simplebar-react";
import { X } from "lucide-react";
import "simplebar-react/dist/simplebar.min.css";

function useLockBodyScroll(open = true) {
  useEffect(() => {
    if (open) {
      const prevBody = document.body.style.overflow;
      const prevHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevBody;
        document.documentElement.style.overflow = prevHtml;
      };
    }
  }, [open]);
}

export default function ServiceModal({ content, onClose, open = true }) {
  const modalRef = useRef(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !content) return null;
  const Icon = Icons[content.icon] || Icons.Wrench;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-2"
      style={{ minHeight: "100vh" }}
      onClick={e => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0 pointer-events-none" />
      <div
        ref={modalRef}
        className="
          relative z-20 w-full max-w-2xl mx-2 sm:mx-0 rounded-3xl shadow-2xl
          border border-blue-100 bg-white/80 backdrop-blur-xl
          flex flex-col overflow-hidden
        "
        tabIndex={-1}
        style={{
          minHeight: 340,
          maxHeight: "96vh",
        }}
      >

        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            sm:top-5 sm:right-5
            w-10 h-10
            bg-white/90 shadow flex items-center justify-center
            rounded-full border border-gray-100
            hover:bg-blue-50 hover:text-blue-600
            transition z-20
            focus:outline-none focus:ring-2 focus:ring-blue-300
          "
          aria-label="Закрыть"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>


        <SimpleBar
          style={{
            maxHeight: "96vh",
            minHeight: 200,
            padding: "28px 20px 40px 20px",
            borderRadius: "1.5rem",
          }}
          className="modal-scroll px-0 py-0 sm:px-0 sm:py-0"
          autoHide={true}
        >
          <div className="flex items-start gap-4 mb-7">
            <div className="w-14 h-14 min-w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow">
              <Icon className="w-7 h-7 text-blue-500" />
            </div>
            <div className="flex-1 pr-14 sm:pr-16">
              <h4 className="text-xl sm:text-2xl font-bold mb-1 break-words" style={{ wordBreak: "break-word" }}>
                {content.title}
              </h4>
              {content.description && (
                <p className="text-gray-500 text-sm sm:text-base">{content.description}</p>
              )}
            </div>
          </div>
          {content.full && (
            <div className="mb-5 text-base text-gray-800 whitespace-pre-line">
              {content.full}
            </div>
          )}
          {content.features && content.features.length > 0 && (
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Особенности:</div>
              <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                {content.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {content.included && content.included.length > 0 && (
            <div className="mb-2">
              <div className="font-semibold text-gray-700 mb-1">В услугу входит:</div>
              <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                {content.included.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-8 text-xs text-gray-400 text-center">
            Остались вопросы?{" "}
            <a
              href="mailto:info@pto-ppr.ru"
              className="underline hover:text-blue-600 transition"
            >
              info@pto-ppr.ru
            </a>
          </div>
        </SimpleBar>
      </div>
    </div>,
    document.body
  );
}
