import { useState, useEffect } from "react";

export default function PriceEditor({ prices = [], onSave }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const parsed = typeof prices === "string" ? JSON.parse(prices) : prices;
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  }, [prices]);

  const handleChange = (idx, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  const addRow = () => {
    setItems((prev) => [...prev, { name: "", duration: "", price: "" }]);
  };

  const removeRow = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus("");
    try {
      await onSave(items); // НЕ stringify
      setStatus("✅ Сохранено");
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      setStatus("❌ Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Редактирование таблицы цен</h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              value={item.name}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
              placeholder="Название услуги"
              className="border p-2 rounded w-1/3"
            />
            <input
              value={item.duration}
              onChange={(e) => handleChange(idx, "duration", e.target.value)}
              placeholder="Срок"
              className="border p-2 rounded w-1/4"
            />
            <input
              value={item.price}
              onChange={(e) => handleChange(idx, "price", e.target.value)}
              placeholder="Цена"
              className="border p-2 rounded w-1/4"
            />
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-red-500 hover:underline text-sm"
            >
              Удалить
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRow}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Добавить строку
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
        {status && <div className="mt-2 text-sm text-gray-600">{status}</div>}
      </div>
    </div>
  );
}
