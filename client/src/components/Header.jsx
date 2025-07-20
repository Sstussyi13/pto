import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const openMenu = () => {
    setMenuOpen(true);
    setIsAnimating(true);
  };

  const closeMenu = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [menuOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) closeMenu();
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/services", label: "Услуги" },
    { to: "/steps", label: "Этапы работы" },
    { to: "/calculator", label: "Калькулятор" },
    { to: "/contacts", label: "Контакты" },
  ];

  const linkClass = "px-2 py-1 rounded transition font-semibold";
  const activeClass = "text-[#193a6a] bg-blue-50";
  const defaultClass = "text-zinc-700 hover:text-[#193a6a] hover:bg-blue-50";

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-[0_2px_24px_0_rgba(25,58,106,0.06)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-black tracking-tight text-[#193a6a] hover:text-[#10244a] transition"
        >
          ПТО / ППР
        </Link>

        <nav className="hidden md:flex space-x-2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={
                `${linkClass} ` +
                (location.pathname === to
                  ? activeClass
                  : defaultClass)
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-2xl text-[#193a6a] focus:outline-none"
          onClick={openMenu}
          aria-label="Открыть меню"
        >
          ☰
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg p-6 transition-transform duration-500 ease-in-out ${
          menuOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-[#193a6a]">Меню</span>
          <button
            onClick={closeMenu}
            className="text-2xl text-zinc-700"
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col gap-2 text-base">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={
                `py-2 px-3 rounded ${linkClass} ` +
                (location.pathname === to
                  ? "bg-[#193a6a] text-white"
                  : "text-zinc-800 hover:bg-blue-50 hover:text-[#193a6a]")
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
