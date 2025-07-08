// src/pages/PriceTableEditor.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import PriceEditor from "../components/price/PriceEditor";

export default function PriceTableEditorPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/content/price_table");
      const parsed = typeof res.data?.value === "string"
        ? JSON.parse(res.data.value)
        : res.data.value;
      setData(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setError("Не удалось загрузить таблицу цен");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updated) => {
    try {
      await axios.put("/api/content/price_table", {
        value: updated,
      });
      setData(JSON.parse(updated)); // Обновим локально
    } catch (err) {
      console.error("Ошибка сохранения:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Редактор прайс-таблицы</h1>
      {loading ? (
        <div className="text-gray-500">Загрузка...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <PriceEditor prices={data} onSave={handleSave} />
      )}
    </div>
  );
}
