import { useState, useEffect } from "react";

export default function PriceEditor({ prices, onSave }) {
  const [list, setList] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const parsed = typeof prices === "string" ? JSON.parse(prices) : prices;
      setList(parsed);
    } catch {
      setList([]);
    }
  }, [prices]);

  const handleChange = (i, field, value) => {
    const copy = [...list];
    copy[i][field] = value;
    setList(copy);
  };

  const handleAdd = () => {
    setList([...list, { name: "", duration: "", price: "" }]);
  };

  const handleRemove = (i) => {
    const copy = [...list];
    copy.splice(i, 1);
    setList(copy);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(JSON.stringify(list));
    } catch (err) {
      alert("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Редактирование цен</h2>

      {list.map((item, i) => (
        <div key={i} className="flex flex-wrap gap-2 items-center border p-3 rounded-md">
          <input
            type="text"
            value={item.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
            placeholder="Название"
            className="flex-1 border p-2 rounded"
          />
          <input
            type="text"
            value={item.duration}
            onChange={(e) => handleChange(i, "duration", e.target.value)}
            placeholder="Срок"
            className="w-40 border p-2 rounded"
          />
          <input
            type="text"
            value={item.price}
            onChange={(e) => handleChange(i, "price", e.target.value)}
            placeholder="Цена"
            className="w-32 border p-2 rounded"
          />
          <button
            onClick={() => handleRemove(i)}
            className="text-red-500 hover:underline text-sm"
          >
            Удалить
          </button>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="text-sm text-blue-600 hover:underline"
      >
        + Добавить позицию
      </button>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        {saving ? "Сохранение..." : "Сохранить изменения"}
      </button>
    </div>
  );
}
