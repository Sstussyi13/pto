import { useEffect, useState } from "react";
import PriceTable from "../price/PriceTable";
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
    <div className="flex flex-col h-full">
      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Цены на услуги</h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Ориентировочные цены на разработку ППР, ПОС и другой документации. Точная смета — после уточнения задания.
        </p>

        {loading && <div className="text-gray-500">Загрузка...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 overflow-x-auto">
            <PriceTable prices={prices} />
          </div>
        )}
      </div>
    </div>
  );
}
