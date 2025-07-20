import React, { useState, useRef, useEffect } from "react";
import { Mail, Phone, Clock } from "lucide-react";

const EMAIL = "inf0.pto.ppr@yandex.com";
const SUBJECT = "Запрос с сайта pto-ppr.ru";

function getMailLink(service) {
  const encodedSubject = encodeURIComponent(SUBJECT);
  const encodedEmail = encodeURIComponent(EMAIL);
  if (service === "gmail") {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}`;
  }
  if (service === "yandex") {
    return `https://mail.yandex.ru/compose?to=${encodedEmail}&subject=${encodedSubject}`;
  }
  return "#";
}

export default function ContactInfo() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        emailRef.current &&
        !emailRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div className="space-y-7">
      <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 relative">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1 text-[#193a6a]">
          <Mail size={18} className="text-[#193a6a]" />
          Почта
        </h3>
        <div className="flex items-center gap-3">
          <button
            ref={emailRef}
            onClick={() => setOpen((v) => !v)}
            className="text-gray-800 hover:text-[#193a6a] text-sm font-medium transition"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
              cursor: "pointer",
            }}
            type="button"
          >
            {EMAIL}
          </button>
        </div>
        {open && (
          <div
            ref={menuRef}
            className="
              absolute left-0 top-[60px] z-20 w-64 p-4
              bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col gap-3
              animate-fade-menu
            "
          >
            <a
              href={getMailLink("gmail")}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-3 px-5 py-3 rounded-lg text-base font-semibold 
                text-gray-900 hover:text-[#193a6a] hover:bg-[#f7fafd] border border-gray-100 transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#193a6a]
              "
              onClick={() => setOpen(false)}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48">
                  <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                  <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                  <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon>
                  <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
                  <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0C43.076,8,45,9.924,45,12.298z"></path>
                </svg>
              </span>
              Gmail
            </a>
            <a
              href={getMailLink("yandex")}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-3 px-5 py-3 rounded-lg text-base font-semibold 
                text-gray-900 hover:text-[#193a6a] hover:bg-[#f7fafd] border border-gray-100 transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#193a6a]
              "
              onClick={() => setOpen(false)}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded">
                <img
                  src="https://img.icons8.com/external-others-inmotus-design/67/external-Yandex-Mail-browser-others-inmotus-design.png"
                  alt="Yandex Mail"
                  width={34}
                  height={34}
                  style={{
                    display: "block",
                    objectFit: "contain",
                    background: "transparent",
                  }}
                />
              </span>
              Яндекс.Почта
            </a>
          </div>
        )}
        <style>{`
          .animate-fade-menu {
            animation: menufade .19s cubic-bezier(.7,.2,.17,1.08);
          }
          @keyframes menufade {
            0% { opacity: 0; transform: translateY(18px) scale(0.98);}
            100% { opacity: 1; transform: none;}
          }
        `}</style>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1 text-[#193a6a]">
          <Phone size={18} className="text-[#193a6a]" />
          Телефон
        </h3>
        <a
          href="tel:+79184522769"
          className="text-gray-900 hover:text-[#193a6a] text-base font-medium transition"
        >
          +7 (918) 452-27-69
        </a>
        <p className="text-gray-500 text-xs mt-1">Работаем по всей России</p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1 text-[#193a6a]">
          <Clock size={18} className="text-[#193a6a]" />
          Режим работы
        </h3>
        <p className="text-gray-800 text-sm">Пн–Сб: 09:00–20:00</p>
        <p className="text-gray-800 text-sm">Вс: выходной</p>
      </div>
    </div>
  );
}
