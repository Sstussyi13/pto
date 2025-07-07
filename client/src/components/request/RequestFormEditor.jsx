import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestFormEditor() {
  const [data, setData] = useState({
    object_types: [],
    id_sections: [],
    control_periods: [],
    service_types: [],
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fields = [
    { key: "object_types", label: "Типы объектов" },
    { key: "id_sections", label: "Разделы ИД" },
    { key: "control_periods", label: "Периоды срезов" },
    { key: "service_types", label: "Типы услуг" },
  ];

  useEffect(() => {
    axios.get("/api/content/all").then((res) => {
      const values = {};
      res.data.forEach((item) => {
        try {
          values[item.key] = JSON.parse(item.value);
        } catch {
          values[item.key] = [];
        }
      });
      setData((prev) => ({ ...prev, ...values }));
    });
  }, []);

  const handleChange = (key, i, value) => {
    const copy = [...data[key]];
    copy[i] = value;
    setData((prev) => ({ ...prev, [key]: copy }));
  };

  const handleAdd = (key) => {
    setData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const handleRemove = (key, i) => {
    const copy = [...data[key]];
    copy.splice(i, 1);
    setData((prev) => ({ ...prev, [key]: copy }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const field of fields) {
        await axios.put(`/api/content/${field.key}`, {
          value: JSON.stringify(data[field.key]),
        });
      }
      setMessage("Сохранено!");
    } catch (err) {
      setMessage("Ошибка при сохранении.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {fields.map(({ key, label }) => (
        <div key={key}>
          <h3 className="text-lg font-semibold mb-2">{label}</h3>
          <div className="space-y-2">
            {data[key].map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => handleChange(key, i, e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => handleRemove(key, i)}
                  className="text-red-500 hover:underline"
                >
                  Удалить
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAdd(key)}
              className="text-sm text-blue-600 hover:underline"
            >
              + Добавить
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        disabled={saving}
      >
        {saving ? "Сохранение..." : "Сохранить изменения"}
      </button>

      {message && <p className="text-sm text-green-600">{message}</p>}
    </div>
  );
}
