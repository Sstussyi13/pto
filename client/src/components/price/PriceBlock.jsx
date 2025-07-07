import { useEffect, useState } from "react";
import PriceTable from "../price/PriceTable";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import axios from "axios";

export default function PriceBlock() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const res = await axios.get("/api/content/price_table");
        const parsed =
          typeof res.data?.value === "string"
            ? JSON.parse(res.data.value)
            : res.data.value;

        setPrices(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        console.error("Ошибка загрузки цен:", err);
        setError("Не удалось загрузить цены");
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">Цены на услуги</h3>
        <p className="text-gray-600 mb-8 max-w-3xl text-base">
          Ниже представлены ориентировочные цены на популярные типы ППР и технической документации.
          Финальная стоимость зависит от объема, сроков и требований. Предоставим точную смету после анализа задания.
        </p>

        {loading && <div className="text-gray-500">Загрузка...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-x-auto">
            <PriceTable prices={prices} />
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition"
          >
            <Calculator className="w-5 h-5" />
            Получить точный расчёт
          </Link>
        </div>
      </div>
    </section>
  );
}
