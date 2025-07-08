import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center bg-gray-800 text-white rounded-full shadow-xl hover:bg-gray-700 transition z-50"
      aria-label="Наверх"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  ) : null;
}
