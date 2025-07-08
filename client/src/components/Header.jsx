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
    }, 300); // Длительность анимации закрытия
  };

  useEffect(() => {
    if (menuOpen) {
      // Блокируем скролл при открытом меню
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  // Закрываем меню при смене страницы
  useEffect(() => {
    if (menuOpen) closeMenu();
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/services", label: "Услуги" },
    { to: "/steps", label: "Этапы работы" },
    { to: "/contacts", label: "Контакты" },
  ];

  const linkClass =
    "text-zinc-700 hover:text-blue-600 transition font-medium";

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 hover:text-zinc-700 transition"
        >
          ПТО / ППР
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={linkClass}>
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-2xl text-zinc-700 focus:outline-none"
          onClick={openMenu}
          aria-label="Открыть меню"
        >
          ☰
        </button>
      </div>

      {/* Оверлей с анимацией */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Мобильное меню с анимацией */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg p-6 transition-transform duration-500 ease-in-out ${
          menuOpen
            ? "transform translate-x-0"
            : "transform translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-zinc-800">
            Меню
          </span>
          <button
            onClick={closeMenu}
            className="text-2xl text-zinc-700"
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-base">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={`${linkClass} py-2 border-b border-gray-100`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}