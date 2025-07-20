import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VacancyModal({ open, vacancy, onClose }) {
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  function isMobile() {
    return window.matchMedia("(max-width: 640px)").matches;
  }

  useEffect(() => {
    if (open && !isMobile()) {
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop?.();
    }
    return () => {
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const node = scrollRef.current;
    if (!node) return;
    if (isMobile()) return;
    const wheelHandler = (e) => {
      const delta = e.deltaY;
      const { scrollTop, scrollHeight, clientHeight } = node;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
        e.preventDefault();
      } else {
        e.preventDefault();
        node.scrollTop += delta;
      }
      e.stopPropagation();
    };
    node.addEventListener("wheel", wheelHandler, { passive: false });
    return () => node.removeEventListener("wheel", wheelHandler);
  }, [open]);

  if (!open || !vacancy) return null;

  function handleRespondClick() {
    navigate(
      `/MultiStepVacancyForm?title=${encodeURIComponent(vacancy.title)}&salary=${encodeURIComponent(vacancy.salary)}&experience=${encodeURIComponent(vacancy.experience)}`
    );
    onClose();
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[120] flex items-center justify-center px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ minHeight: "100vh" }}
        onClick={e => {
          if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
        }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          ref={modalRef}
          className="relative w-full max-w-[760px] mx-auto bg-white rounded-3xl shadow-2xl flex flex-col overflow-visible"
          initial={{ y: 80, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 24, stiffness: 210 }}
          style={{
            minHeight: 320,
            maxHeight: "94vh"
          }}
        >
          <button
            type="button"
            className="
              absolute z-10 top-2 right-3 sm:top-4 sm:right-6
              text-3xl text-gray-400 hover:text-[#193a6a] font-light
              focus:outline-none transition
              bg-white/80 rounded-full
              w-11 h-11 flex items-center justify-center
              shadow-md
            "
            style={{
              fontSize: "2rem",
              lineHeight: 1,
            }}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
          <div
            ref={scrollRef}
            className="
              vacancy-modal-scroll
              overflow-y-auto
              px-2 sm:px-8 py-8
              !scrollbar-thin !scrollbar-thumb-gray-300
            "
            style={{
              maxHeight: "80vh",
              minHeight: 200,
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              touchAction: "pan-y",
            }}
            tabIndex={0}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[#193a6a] mb-4 px-0 sm:px-3" style={{ wordBreak: "break-word", paddingRight: "2.5rem" }}>
              {vacancy.title}
            </h3>
            <div className="flex flex-wrap items-center gap-5 mb-4">
              <span
                className="text-2xl sm:text-3xl font-[650] text-[#193a6a] leading-none whitespace-nowrap tracking-tight font-mono"
                style={{
                  background: "linear-gradient(90deg, #193a6a, #3d5af1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontVariantNumeric: "tabular-nums"
                }}
              >
                {vacancy.salary}
              </span>
              <span className="text-base sm:text-lg font-semibold text-gray-800">
                Опыт: <span className="font-bold">{vacancy.experience}</span>
              </span>
            </div>
            <div className="mb-6 text-gray-800 text-base sm:text-lg leading-relaxed">{vacancy.description}</div>
            <div className="mb-3 text-sm font-semibold text-gray-700">Требования:</div>
            <ul className="text-gray-700 text-xs sm:text-sm pl-6 mb-5 list-disc space-y-2">
              {(vacancy.requirements || []).map((req, i) => <li key={i}>{req}</li>)}
            </ul>
            <div className="mb-3 text-sm font-semibold text-gray-700">Условия:</div>
            <ul className="text-gray-700 text-xs sm:text-sm pl-6 mb-6 list-disc space-y-2">
              {(vacancy.more || []).map((m, i) => <li key={i}>{m}</li>)}
            </ul>
            <div className="text-xs text-gray-500 mb-4">
              Отправьте резюме на&nbsp;
              <a
                href="mailto:info@pto-ppr.ru"
                className="text-[#193a6a] hover:text-[#10244a] font-medium transition"
                style={{ textDecoration: "none" }}
              >
                info@pto-ppr.ru
              </a>
            </div>
            <div className="mt-8 flex flex-col items-end">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full px-7 py-3 rounded-full font-semibold text-base shadow-lg transition-all duration-200 select-none bg-[#193a6a] text-white hover:bg-[#10244a] hover:scale-105 active:scale-95"
                style={{
                  letterSpacing: "0.01em",
                  minHeight: "50px",
                  minWidth: "200px",
                  fontSize: "1.1rem"
                }}
                onClick={handleRespondClick}
              >
                <Mail className="inline-block -mt-1 w-5 h-5" />
                Откликнуться
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
